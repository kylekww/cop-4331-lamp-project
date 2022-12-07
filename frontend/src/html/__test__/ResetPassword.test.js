import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from '../ResetPassword';

beforeEach(() => {
    fetch.resetMocks();
})


describe("Email Tests", () => {
    test('checks if the email text box is on the page', () => {
        render(<ResetPassword />);
        const element = screen.getByTestId("email");
        expect(element).toBeInTheDocument();
    });

    test('checks that the email has the correct original text', async () => {
        render(<ResetPassword />);
        const text = screen.getByTestId("text");
        expect(text.textContent).toBe("A request will be sent to your knights email. ");
    });

    test('checks that the email fails if it is not registered', async () => {
        render(<ResetPassword />);
        const buttonResult = fetch.mockResponse(JSON.stringify({message: "We could not find a user with this username"}), { status: 500 });

        const element = screen.getByTestId("email");
        fireEvent.change(element, { target: {value: "Test@gmail.com"} });
        const button = screen.getByTestId("button");
        fireEvent.click(button);

        const text = screen.getByTestId("text");
        await waitFor(() => expect(text.textContent).toBe("This user does not exist. "));
        expect(text.textContent).toBe("This user does not exist. ");
    });

    test('checks that the email succeeds if it is linked to an account', async () => {
        render(<ResetPassword />);
        const buttonResult = fetch.mockResponse(JSON.stringify({message: "Password reset link has been sent to your email"}), { status: 200 });

        const element = screen.getByTestId("email");
        fireEvent.change(element, { target: {value: "Test@knights.ucf.edu"} });
        const button = screen.getByTestId("button");
        fireEvent.click(button);

        const text = screen.getByTestId("text");
        await waitFor(() => expect(text.textContent).toBe("An email was sent successfully. Check your knights mail to reset your password! "));
        expect(text.textContent).toBe("An email was sent successfully. Check your knights mail to reset your password! ");
    });
})


describe("Button Test", () => {
    test('checks if the change password button is on the page', () => {
        render(<ResetPassword />);
        const element = screen.getByTestId("button");
        expect(element).toBeInTheDocument();
    });
})


describe("Route Tests", () => {
    test('checks if the login link is on the page', () => {
      render(<ResetPassword />);
      const element = screen.getByText("Login!");
      expect(element).toBeInTheDocument();
    });
  
    test('checks if the login link contains the correct routing link', () => {
      render(<ResetPassword />);
      const element = screen.getByText("Login!");
      expect(element).toHaveAttribute('href', '/');
    });
})
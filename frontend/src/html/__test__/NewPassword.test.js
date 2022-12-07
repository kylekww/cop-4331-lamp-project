import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewPassword from '../NewPassword';
import passwordRequirements from '../NewPassword';


describe("Password Tests", () => {
    test('checks if the password text box is on the page', () => {
        render(<NewPassword />);
        const element = screen.getByTestId("password");
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the password text box changes input when typed into', () => {
        render(<NewPassword />);
        const element = screen.getByTestId("password");
        fireEvent.change(element, { target: {value: "Test"} })
        expect(element.value).toBe("Test");
    });

    test('checks that the password text box is a password type', () => {
        render(<NewPassword />);
        const element = screen.getByTestId("password");
        expect(element.type).toBe("password");
    });

    test('checks that the password fails if not at least 8 characters', () => {
        const res = passwordRequirements("Bad");
        expect(res).toBe(false);
    });
    // has 1 number
    // has 1 uppercase character
})


describe("Password Requirements", () => {
    test('checks if the password requirements are on the page', () => {
      render(<NewPassword />);
      const element = screen.getByTestId("requirements");
      expect(element).toBeInTheDocument();
    });
})


describe("Button Tests", () => {
    test('checks if the change password button is on the page', () => {
        render(<NewPassword />);
        const element = screen.getByTestId("button");
        expect(element).toBeInTheDocument();
    });
})


describe("Route Tests", () => {
    test('checks if the login link is on the page', () => {
      render(<NewPassword />);
      const element = screen.getByText("Login!");
      expect(element).toBeInTheDocument();
    });
  
    test('checks if the register link contains the correct routing link', () => {
      render(<NewPassword />);
      const element = screen.getByText("Login!");
      expect(element).toHaveAttribute('href', '/');
    });
})
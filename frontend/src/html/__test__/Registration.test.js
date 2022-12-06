import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Registration from '../Registration';


describe("Logo", () => {
    test('checks if the logo is on the page', () => {
      render(<Registration />);
      const iconElement = screen.getByTestId('register-icon');
      expect(iconElement).toBeInTheDocument();
    });
  })


describe("Full Name Tests", () => {
    test('checks if the name text box is on the page', () => {
        render(<Registration />);
        const nameElement = screen.getByTestId("name");
        expect(nameElement).toBeInTheDocument();
    });
    
    test('checks that the name text box changes input when typed into', () => {
        render(<Registration />);
        const inputElement = screen.getByTestId("name");
        fireEvent.change(inputElement, { target: {value: "Test the name"} })
        expect(inputElement.value).toBe("Test the name");
    });
})


describe("Username Tests", () => {
    test('checks if the username text box is on the page', () => {
        render(<Registration />);
        const usernameElement = screen.getByTestId("username");
        expect(usernameElement).toBeInTheDocument();
    });
    
    test('checks that the username text box changes input when typed into', () => {
        render(<Registration />);
        const inputElement = screen.getByTestId("username");
        fireEvent.change(inputElement, { target: {value: "Test the username"} })
        expect(inputElement.value).toBe("Test the username");
    });

    // is unique
})


describe("Email Tests", () => {
    test('checks if the email text box is on the page', () => {
        render(<Registration />);
        const element = screen.getByTestId("email");
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the username text box changes input when typed into', () => {
        render(<Registration />);
        const element = screen.getByTestId("email");
        fireEvent.change(element, { target: {value: "Test the email"} })
        expect(element.value).toBe("Test the email");
    });

    // Is unique
    // Ends in .ucf.edu
})
    

describe("Password Tests", () => {
    test('checks if the password text box is on the page', () => {
        render(<Registration />);
        const element = screen.getByTestId("password");
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the username text box changes input when typed into', () => {
        render(<Registration />);
        const element = screen.getByTestId("password");
        fireEvent.change(element, { target: {value: "Test"} })
        expect(element.value).toBe("Test");
    });

    // Is a password type
    // is 8 characters
    // has 1 number
    // has 1 uppercase character
})
    

describe("Button Tests", () => {
    test('checks if the button is on the page', () => {
        render(<Registration />);
        const element = screen.getByTestId("register-button");
        expect(element).toBeInTheDocument();
    });
})


describe("Route Tests", () => {
    test('checks if the login link is on the page', () => {
      render(<Registration />);
      const registerElement = screen.getByText("Already have an account? Login!");
      expect(registerElement).toBeInTheDocument();
    });
  
    test('checks if the register link contains the correct routing link', () => {
      render(<Registration />);
      const registerElement = screen.getByText("Already have an account? Login!");
      expect(registerElement).toHaveAttribute('href', '/');
    });
})

describe("Password Requirements", () => {
    test('checks if the password requirements are on the page', () => {
      render(<Registration />);
      const registerElement = screen.getByText("Password Requirements:");
      expect(registerElement).toBeInTheDocument();
    });
})
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProfile from '../EditProfile';

describe("Full Name Tests", () => {
    test('checks if the name text box is on the page', () => {
        render(<EditProfile />);
        const element = screen.getByTestId("name");
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the name text box changes input when typed into', () => {
        render(<EditProfile />);
        const element = screen.getByTestId("name");
        fireEvent.change(element, { target: {value: "Test"} })
        expect(element.value).toBe("Test");
    });

    // displays previous text
})
    

describe("Userame Tests", () => {
    test('checks if the username text box is on the page', () => {
        render(<EditProfile />);
        const element = screen.getByTestId("username");
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the username text box changes input when typed into', () => {
        render(<EditProfile />);
        const element = screen.getByTestId("username");
        fireEvent.change(element, { target: {value: "Test"} })
        expect(element.value).toBe("Test");
    });

    // displays previous text
})


describe("Email Tests", () => {
    test('checks if the email text box is on the page', () => {
        render(<EditProfile />);
        const element = screen.getByTestId("email");
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the email text box changes input when typed into', () => {
        render(<EditProfile />);
        const element = screen.getByTestId("email");
        fireEvent.change(element, { target: {value: "Test"} });
        expect(element.value).toBe("Test");
    });

    // displays previous text

    // email must end in .ucf.edu
})


describe("Password Tests", () => {
    test('checks if the password text box is on the page', () => {
        render(<EditProfile />);
        const element = screen.getByTestId("password");
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the password text box changes input when typed into', () => {
        render(<EditProfile />);
        const element = screen.getByTestId("password");
        fireEvent.change(element, { target: {value: "Test"} })
        expect(element.value).toBe("Test");
    });

    // displays previous text

    // Is a password type
    // is 8 characters
    // has 1 number
    // has 1 uppercase character
})


describe("Password Requirements", () => {
    test('checks if the password requirements are on the page', () => {
      render(<EditProfile />);
      const registerElement = screen.getByText("Requirements: ");
      expect(registerElement).toBeInTheDocument();
    });
})


describe("Edit Button Tests", () => {
    test('checks if the button is on the page', () => {
        render(<EditProfile />);
        const element = screen.getByTestId("edit-button");
        expect(element).toBeInTheDocument();
    });
})


describe("Cancel Button Tests", () => {
    test('checks if the button is on the page', () => {
        render(<EditProfile />);
        const element = screen.getByTestId("cancel-button");
        expect(element).toBeInTheDocument();
    });
})
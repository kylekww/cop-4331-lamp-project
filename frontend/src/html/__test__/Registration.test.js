import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Registration from '../Registration'

beforeEach(() => {
    fetch.resetMocks();
})


describe("Full Name Tests", () => {
    test('checks if the name text box is on the page', async () => {
        render(<Registration />);
        const element = screen.getByTestId("name");
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the name text box changes input when typed into', async () => {
        render(<Registration />);
        const element = screen.getByTestId("name");
        fireEvent.change(element, { target: {value: "Test"} });
        expect(element.value).toBe("Test");
    });
}) 
    

describe("Username Tests", () => {
    test('checks if the username text box is on the page', async () => {
        render(<Registration />);
        const element = screen.getByTestId("username");
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the username text box changes input when typed into', async () => {
        render(<Registration />);
        const element = screen.getByTestId("username");
        fireEvent.change(element, { target: {value: "Test"} });
        expect(element.value).toBe("Test");
    });
})


describe("Email Tests", () => {
    test('checks if the email text box is on the page', async () => {
        render(<Registration />);
        const element = screen.getByTestId("email");
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the email text box changes input when typed into', async () => {
        render(<Registration />);
        const element = screen.getByTestId("email");
        fireEvent.change(element, { target: {value: "Test"} });
        expect(element.value).toBe("Test");
    });
})


describe("Password Tests", () => {
    test('checks if the password text box is on the page', async () => {
        render(<Registration />);
        const element = screen.getByTestId("password");
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the password text box changes input when typed into', async () => {
        render(<Registration />);
        const element = screen.getByTestId("password");
        fireEvent.change(element, { target: {value: "Test"} });
        expect(element.value).toBe("Test");
    });

    test('checks that the password text box is a password type', async () => {
        render(<Registration />);
        const element = screen.getByTestId("password");
        expect(element.type).toBe("password");
    });
})


describe("Password Requirements", () => {
    test('checks if the password requirements are on the page', async () => {
        render(<Registration />);
        const registerElement = screen.getByTestId("requirements");
        expect(registerElement).toBeInTheDocument();
    });
})


describe("Register Button Test", () => {
    test('checks if the button is on the page', async () => {
        render(<Registration />);
        const element = screen.getByTestId("register-button");
        expect(element).toBeInTheDocument();
    });
})


describe("Error Label Tests", () => {
    test('checks that the error label exists', async () => {
        render(<Registration />);
        const errorElement = screen.getByTestId("error-text");
        expect(errorElement).toBeInTheDocument();
    });

    test('checks that the error label is originally invisible', async () => {
        render(<Registration />);
        const errorElement = screen.getByTestId("error-text");
        expect(errorElement).not.toBeVisible();
    });

    test('checks that the email is invalid if it is already taken', async () => {
        render(<Registration />);
        const buttonResult = fetch.mockResponse(JSON.stringify({message: "Email address has already been used"}), { status: 409 });

        const element = screen.getByTestId("email");
        fireEvent.change(element, { target: {value: "Test@knights.ucf.edu"} });
        const passwordelement = screen.getByTestId("password");
        fireEvent.change(passwordelement, { target: {value: "AAaaAAaa1111"} });
        const button = screen.getByTestId("register-button");
        fireEvent.click(button);

        const errorElement = screen.getByTestId("error-text");
        await waitFor(() => expect(errorElement).toBeVisible());
        expect(errorElement.textContent).toBe("This username/email is already taken!");
    })
    
    test('checks that the email is invalid if it does not end in ucf.edu', async () => {
        render(<Registration />);
        const buttonResult = fetch.mockResponse(JSON.stringify({message: "you are registered successfully"}), { status: 201 });

        const element = screen.getByTestId("email");
        fireEvent.change(element, { target: {value: "Test@gmail.com"} });
        const passwordelement = screen.getByTestId("password");
        fireEvent.change(passwordelement, { target: {value: "AAaaAAaa1111"} });
        const button = screen.getByTestId("register-button");
        fireEvent.click(button);

        const errorElement = screen.getByTestId("error-text");
        await waitFor(() => expect(errorElement).toBeVisible());
        expect(errorElement.textContent).toBe("Please use a UCF email!");
    })

    test('checks that the password is invalid if it is less than 8 characters', async () => {
        render(<Registration />);
        
        const buttonResult = fetch.mockResponse(JSON.stringify({message: "you are registered successfully"}), { status: 201 });

        const nameelement = screen.getByTestId("name");
        fireEvent.change(nameelement, { target: {value: "Test Name"} });
        const usernameelement = screen.getByTestId("username");
        fireEvent.change(usernameelement, { target: {value: "Test Username"} });
        const emailelement = screen.getByTestId("email");
        fireEvent.change(emailelement, { target: {value: "Test@knights.ucf.edu"} });
        const element = screen.getByTestId("password");
        fireEvent.change(element, { target: {value: "Bad"} });
        const button = screen.getByTestId("register-button");
        fireEvent.click(button);

        const errorElement = screen.getByTestId("error-text");
        await waitFor(() => expect(errorElement).toBeVisible());
        expect(errorElement.textContent).toBe("Please check that you have met all of the password requirements!");
    })

    test('checks that the password is invalid if it does not contain a number', async () => {
        render(<Registration />);
        
        const buttonResult = fetch.mockResponse(JSON.stringify({message: "you are registered successfully"}), { status: 201 });

        const nameelement = screen.getByTestId("name");
        fireEvent.change(nameelement, { target: {value: "Test Name"} });
        const usernameelement = screen.getByTestId("username");
        fireEvent.change(usernameelement, { target: {value: "Test Username"} });
        const emailelement = screen.getByTestId("email");
        fireEvent.change(emailelement, { target: {value: "Test@knights.ucf.edu"} });
        const element = screen.getByTestId("password");
        fireEvent.change(element, { target: {value: "Aaaaaaaaaaaaaaaa"} });
        const button = screen.getByTestId("register-button");
        fireEvent.click(button);

        const errorElement = screen.getByTestId("error-text");
        await waitFor(() => expect(errorElement).toBeVisible());
        expect(errorElement.textContent).toBe("Please check that you have met all of the password requirements!");
    })
    
    test('checks that the password is invalid if it does not contain an uppercase character', async () => {
        render(<Registration />);
        
        const buttonResult = fetch.mockResponse(JSON.stringify({message: "you are registered successfully"}), { status: 201 });

        const nameelement = screen.getByTestId("name");
        fireEvent.change(nameelement, { target: {value: "Test Name"} });
        const usernameelement = screen.getByTestId("username");
        fireEvent.change(usernameelement, { target: {value: "Test Username"} });
        const emailelement = screen.getByTestId("email");
        fireEvent.change(emailelement, { target: {value: "Test@knights.ucf.edu"} });
        const element = screen.getByTestId("password");
        fireEvent.change(element, { target: {value: "aaaaaaaaaaaaaaaa1111"} });
        const button = screen.getByTestId("register-button");
        fireEvent.click(button);

        const errorElement = screen.getByTestId("error-text");
        await waitFor(() => expect(errorElement).toBeVisible());
        expect(errorElement.textContent).toBe("Please check that you have met all of the password requirements!");
    })

    test('checks that the password is invalid if it does not contain a lowercase letter', async () => {
        render(<Registration />);
        
        const buttonResult = fetch.mockResponse(JSON.stringify({message: "you are registered successfully"}), { status: 201 });

        const nameelement = screen.getByTestId("name");
        fireEvent.change(nameelement, { target: {value: "Test Name"} });
        const usernameelement = screen.getByTestId("username");
        fireEvent.change(usernameelement, { target: {value: "Test Username"} });
        const emailelement = screen.getByTestId("email");
        fireEvent.change(emailelement, { target: {value: "Test@knights.ucf.edu"} });
        const element = screen.getByTestId("password");
        fireEvent.change(element, { target: {value: "AAAAAAAAAAAAAAAA1111"} });
        const button = screen.getByTestId("register-button");
        fireEvent.click(button);

        const errorElement = screen.getByTestId("error-text");
        await waitFor(() => expect(errorElement).toBeVisible());
        expect(errorElement.textContent).toBe("Please check that you have met all of the password requirements!");
    });

    test('checks that an account can be registered if all the information is valid', async () => {
        render(<Registration />);
        
        const buttonResult = fetch.mockResponse(JSON.stringify({message: "you are registered successfully"}), { status: 201 });

        const nameelement = screen.getByTestId("name");
        fireEvent.change(nameelement, { target: {value: "Test Name"} });
        const usernameelement = screen.getByTestId("username");
        fireEvent.change(usernameelement, { target: {value: "Test Username"} });
        const emailelement = screen.getByTestId("email");
        fireEvent.change(emailelement, { target: {value: "Test@knights.ucf.edu"} });
        const element = screen.getByTestId("password");
        fireEvent.change(element, { target: {value: "AAaaAAaa1111"} });
        const button = screen.getByTestId("register-button");
        fireEvent.click(button);

        const errorElement = screen.getByTestId("error-text");
        await waitFor(() => expect(errorElement).toBeVisible());
        expect(errorElement.textContent).toBe("Success! Bringing you back to login...");
    });
})
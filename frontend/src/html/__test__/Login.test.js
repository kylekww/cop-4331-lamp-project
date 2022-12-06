import { Avatar } from '@mui/material';
import { render, screen } from '@testing-library/react';
import Login from '../Login';

describe("Existance Tests", () => {
  test('checks if the logo is on the page', () => {
    render(<Login />);
    const iconElement = screen.getByTitle('LoginIcon');
    expect(iconElement).toBeInTheDocument();
  });
  
  test('checks if the username text box is on the page', () => {
    render(<Login />);
    const usernameElement = screen.getByText("Username");
    expect(usernameElement).toBeInTheDocument();
  });
  
  test('checks if the password text box is on the page', () => {
    render(<Login />);
    const passwordElement = screen.getByText("Password");
    expect(passwordElement).toBeInTheDocument();
  });
  
  test('checks if the error text is on the page', () => {
    render(<Login />);
    const errorElement = screen.getByTitle("ErrorText");
    expect(errorElement).toBeInTheDocument();
  });
  
  test('checks if the login button is on the page', () => {
    render(<Login />);
    const loginButtonElement = screen.getByTitle("LoginButton");
    expect(loginButtonElement).toBeInTheDocument();
  });
  
  test('checks if the register link is on the page', () => {
    render(<Login />);
    const registerElement = screen.getByText("Don't have an account? Sign Up!");
    expect(registerElement).toBeInTheDocument();
  });
  
  test('checks if the forgot password link is on the page', () => {
    render(<Login />);
    const forgotPasswordElement = screen.getByText("Forgot password? Reset it!");
    expect(forgotPasswordElement).toBeInTheDocument();
  }); 
})


describe("Username Tests", () => {
  test('checks that the username text box contains "Username"', () => {
    render(<Login />);
    const usernameElement = screen.getByTitle("username");
    expect(usernameElement).toHaveTextContent("Username");
  });
  
  // Test if the username can be read
})


describe("Password Tests", () => {
  test('checks that the password text box contains "Password"', () => {
    render(<Login />);
    const passwordElement = screen.getByTitle("password");
    expect(passwordElement).toHaveTextContent("Password");
  });

  // Test if the password can be read
})


describe("Error Message Tests", () => {
  test('checks that the error message is originally invisible', () => {
    render(<Login />);
    const errorElement = screen.getByTitle("ErrorText");
    expect(errorElement).toBeVisible();
  });

  // Test that the error appears for invalid username (toBeVisible())

  // Test that the error appears for invalid password

  // Test that the error does not appear for valid username and password (.not.toBeVisible())
})


describe("Login Button Tests", () => {
    // Test that the sign in button works when the username and password are valid

    // Test that the sign in button does not work when the username is invalid

    // Test that the sign in button does not work when the password is invalid
})


describe("Route Tests", () => {
  // Test that the sign up link works

  // Test that the forgot password link works
})
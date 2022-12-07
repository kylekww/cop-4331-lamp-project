import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { range } from 'lodash';
import Login from '../Login';
import doLogin from '../Login';

beforeEach(() => {
  fetch.resetMocks();
})


describe("Logo", () => {
  test('checks if the logo is on the page', () => {
    render(<Login />);
    const iconElement = screen.getByTestId('login-icon');
    expect(iconElement).toBeInTheDocument();
  });
})


describe("Username Tests", () => {
  test('checks if the username text box is on the page', () => {
    render(<Login />);
    const usernameElement = screen.getByTestId("username");
    expect(usernameElement).toBeInTheDocument();
  });

  test('checks that the username text box changes input when typed into', () => {
    render(<Login />);
    const inputElement = screen.getByTestId("username");
    fireEvent.change(inputElement, { target: {value: "Test the username"} })
    expect(inputElement.value).toBe("Test the username");
  });
})


describe("Password Tests", () => {
  test('checks if the password text box is on the page', () => {
    render(<Login />);
    const passwordElement = screen.getByTestId("password");
    expect(passwordElement).toBeInTheDocument();
  });

  test('checks that the password text box changes input when typed into', () => {
    render(<Login />);
    const inputElement = screen.getByTestId("password");
    fireEvent.change(inputElement, { target: {value: "Test the password"} })
    expect(inputElement.value).toBe("Test the password");
  });

  test('checks that the password text box is a password type', () => {
    render(<Login />);
    const inputElement = screen.getByTestId("password");
    expect(inputElement.type).toBe("password");
  });
})


describe("Error Message Tests", () => {
  test('checks if the error text is on the page', () => {
    render(<Login />);
    const errorElement = screen.getByTestId("error-text");
    expect(errorElement).toBeInTheDocument();
  });

  test('checks that the error message is originally invisible', () => {
    render(<Login />);
    const errorElement = screen.getByTestId("error-text");
    expect(errorElement).not.toBeVisible();
  });

  test('checks that the error text appears on the page when the button is clicked', async () => {
    render(<Login />);
    fetch.mockResponseOnce(JSON.stringify({message: "username does not exist."}), { status: 404 });

    const buttonElement = screen.getByTestId("login-button");
    fireEvent.click(buttonElement);

    const errorElement = screen.getByTestId("error-text");
    await waitFor(() => expect(errorElement).toBeVisible());
    expect(errorElement).toBeVisible();
  })

  test('checks that the error message text is correct for invalid username', async () => {
    render(<Login />);
    fetch.mockResponseOnce(JSON.stringify({message: "username does not exist."}), { status: 404 });

    const buttonElement = screen.getByTestId("login-button");
    fireEvent.click(buttonElement);

    const errorElement = screen.getByTestId("error-text");
    await waitFor(() => expect(errorElement).toBeVisible());
    expect(errorElement.textContent).toBe("Invalid Username");
  });

  test('checks that the error message text is correct for invalid password', async () => {
    render(<Login />);
    fetch.mockResponseOnce(JSON.stringify({message: "password incorrect"}), { status: 401 });

    const buttonElement = screen.getByTestId("login-button");
    fireEvent.click(buttonElement);

    const errorElement = screen.getByTestId("error-text");
    await waitFor(() => expect(errorElement).toBeVisible());
    expect(errorElement.textContent).toBe("Invalid Password");
  });

  test('checks that the error message text is correct for successful sign-in', async () => {
    render(<Login />);
    fetch.mockResponseOnce(JSON.stringify({message: "you are successfully logged in."}));

    const buttonElement = screen.getByTestId("login-button");
    fireEvent.click(buttonElement);

    const errorElement = screen.getByTestId("error-text");
    await waitFor(() => expect(errorElement).toBeVisible());
    expect(errorElement.textContent).toBe("Success! Logging in...");
  });
})


describe("Login Button Tests", () => {
  test('checks if the login button is on the page', () => {
    render(<Login />);
    const loginButtonElement = screen.getByTestId("login-button");
    expect(loginButtonElement).toBeInTheDocument();
  });
})


describe("Route Tests", () => {
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

  test('checks if the register link contains the correct routing link', () => {
    render(<Login />);
    const registerElement = screen.getByText("Don't have an account? Sign Up!");
    expect(registerElement).toHaveAttribute('href', '/register');
  });

  test('checks if the forgot password link contains the correct routing link', () => {
    render(<Login />);
    const registerElement = screen.getByText("Forgot password? Reset it!");
    expect(registerElement).toHaveAttribute('href', '/resetpassword');
  });
})
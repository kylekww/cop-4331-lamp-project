import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProfile from '../EditProfile';
import { passwordRequirements, validEmail } from '../EditProfile';

beforeEach(() => {
    fetch.resetMocks();
})


describe("Full Name Tests", () => {
    test('checks if the name text box is on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const element = screen.getByTestId("name");
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the name text box changes input when typed into', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const element = screen.getByTestId("name");
        fireEvent.change(element, { target: {value: "Test"} });
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(element.value).toBe("Test");
    });

    test('checks that the name text box updates with the user information', async () => {
        const user = fetch.mockResponse(JSON.stringify({
            "user": {
                "_id": "638e89fb87b4d02d080e4f93",
                "email": "test@knights.ucf.edu",
                "username": "test",
                "name": "testname",
                "verified": true,
                "moderator": false,
                "color": "#4ae69f",
                "createdAt": "2022-12-06T00:16:59.478Z",
                "updatedAt": "2022-12-07T05:08:34.017Z",
                "emailVerifyToken": null
            }
        })); 
        
        render(<EditProfile />);
        await waitFor(() => screen.getByText("testname"));
        expect(screen.getByText("testname")).toBeInTheDocument();
    });
}) 
    

describe("Username Tests", () => {
    test('checks if the username text box is on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const element = screen.getByTestId("username");
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the username text box changes input when typed into', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const element = screen.getByTestId("username");
        fireEvent.change(element, { target: {value: "Test"} });
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(element.value).toBe("Test");
    });

    test('checks that the username text box updates with the user information', async () => {
        const user = fetch.mockResponse(JSON.stringify({
            "user": {
                "_id": "638e89fb87b4d02d080e4f93",
                "email": "test@knights.ucf.edu",
                "username": "test",
                "name": "testname",
                "verified": true,
                "moderator": false,
                "color": "#4ae69f",
                "createdAt": "2022-12-06T00:16:59.478Z",
                "updatedAt": "2022-12-07T05:08:34.017Z",
                "emailVerifyToken": null
            }
        })); 
        
        render(<EditProfile />);
        await waitFor(() => screen.getByText("test"));
        expect(screen.getByText("test")).toBeInTheDocument();
    });
})


describe("Email Tests", () => {
    test('checks if the email text box is on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const element = screen.getByTestId("email");
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the email text box changes input when typed into', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const element = screen.getByTestId("email");
        fireEvent.change(element, { target: {value: "Test"} });
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(element.value).toBe("Test");
    });

    test('checks that the email text box updates with the user information', async () => {
        const user = fetch.mockResponse(JSON.stringify({
            "user": {
                "_id": "638e89fb87b4d02d080e4f93",
                "email": "test@knights.ucf.edu",
                "username": "test",
                "name": "testname",
                "verified": true,
                "moderator": false,
                "color": "#4ae69f",
                "createdAt": "2022-12-06T00:16:59.478Z",
                "updatedAt": "2022-12-07T05:08:34.017Z",
                "emailVerifyToken": null
            }
        })); 
        
        render(<EditProfile />);
        await waitFor(() => screen.getByText("test@knights.ucf.edu"));
        expect(screen.getByText("test@knights.ucf.edu")).toBeInTheDocument();
    });

    // email must end in .ucf.edu
})


describe("Password Tests", () => {
    test('checks if the password text box is on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const element = screen.getByTestId("password");
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(element).toBeInTheDocument();
    });
    
    test('checks that the password text box changes input when typed into', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const element = screen.getByTestId("password");
        fireEvent.change(element, { target: {value: "Test"} });
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(element.value).toBe("Test");
    });

    test('checks that the password text box is a password type', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const element = screen.getByTestId("password");
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(element.type).toBe("password");
    });

    test('checks that the password is invalid if it has less than 8 characters', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const res = passwordRequirements("Bad");
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(res).toBe(false);
    })
    // is 8 characters
    // has 1 number
    // has 1 uppercase character
})


describe("Password Requirements", () => {
    test('checks if the password requirements are on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const registerElement = screen.getByText("Password Requirements:");
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(registerElement).toBeInTheDocument();
    });
})


describe("Edit Button Tests", () => {
    test('checks if the button is on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<EditProfile />);
        const element = screen.getByTestId("edit-button");
        await waitFor(() => screen.getByText("fetchcalled"));
        expect(element).toBeInTheDocument();
    });
})
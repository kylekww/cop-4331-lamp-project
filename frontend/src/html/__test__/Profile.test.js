import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from '../Profile';

beforeEach(() => {
    fetch.resetMocks();
})


describe("Full Name Tests", () => {
    test('checks if the name field is on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<Profile />);
        const element = screen.getByTestId("full-name");
        await waitFor(() => screen.findByText("Fullname: fetchcalled"));
        expect(element).toBeInTheDocument();
    });

    test('checks that the name field updates with the user information', async () => {
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
        
        render(<Profile />);
        await waitFor(() => screen.getByText("Fullname: testname"));
        expect(screen.getByText("Fullname: testname")).toBeInTheDocument();
    });
}) 
    

describe("Username Tests", () => {
    test('checks if the username field is on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<Profile />);
        const element = screen.getByTestId("username");
        await waitFor(() => screen.findByText("Fullname: fetchcalled"));
        expect(element).toBeInTheDocument();
    });

    test('checks that the username field updates with the user information', async () => {
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
        
        render(<Profile />);
        await waitFor(() => screen.getByText("Username: test"));
        expect(screen.getByText("Username: test")).toBeInTheDocument();
    });
})


describe("Return Button Test", () => {
    test('checks if the button is on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<Profile />);
        const element = screen.getByTestId("return");
        await waitFor(() => screen.findByText("Fullname: fetchcalled"));
        expect(element).toBeInTheDocument();
    });
})


describe("Edit Button Test", () => {
    test('checks if the button is on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<Profile />);
        const element = screen.getByTestId("edit");
        await waitFor(() => screen.findByText("Fullname: fetchcalled"));
        expect(element).toBeInTheDocument();
    });
})


describe("Logout Button Tests", () => {
    test('checks if the button is on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<Profile />);
        const element = screen.getByTestId("logout");
        await waitFor(() => screen.findByText("Fullname: fetchcalled"));
        expect(element).toBeInTheDocument();
    }); 
}) 
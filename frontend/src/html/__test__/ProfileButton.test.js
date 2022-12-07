import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileButton from '../landing_page/ProfileButton';

beforeEach(() => {
    fetch.resetMocks();
})


describe("Name check", () => {
    test('checks if the name of the user is displayed on the page', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"name": "fetchcalled"}}));
        render(<ProfileButton />);
        await waitFor(() => screen.getByText("Hello fetchcalled!"));

        const element = screen.getByTestId("name");
        expect(element.textContent).toBe("Hello fetchcalled!");
    });
});


describe("Character check", () => {
    test('checks if the first letter of the user is displayed on the avatar', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"username": "fetchcalled"}}));
        render(<ProfileButton />);
        await waitFor(() => screen.getByText("F"));

        const element = screen.getByTestId("firstChar");
        expect(element.textContent).toBe("F");
    });
});


describe("Character check", () => {
    test('checks that the avatar exists', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"username": "fetchcalled"}}));
        render(<ProfileButton />);
        await waitFor(() => screen.getByText("F"));

        const element = screen.getByTestId("avatar");
        expect(element).toBeInTheDocument();
    })
    
    test('checks that the correct color is displayed on the avatar', async () => {
        const user = fetch.mockResponse(JSON.stringify({"user": {"color": "#FFF000", "username": "Test"}}));
        render(<ProfileButton />);
        await waitFor(() => screen.getByText("T"));

        const element = screen.getByTestId("avatar");
        expect(element).toHaveStyle("backgroundColor: #FFF000");
    });
});
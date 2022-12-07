import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConfessionPost from '../ConfessionPost';

// Text "confessionText"
describe("Confession Text Tests", () => {
    test('checks if there exists confession text', () => {
      render(<ConfessionPost post={JSON.stringify({
        "_id": "639085dad187d0e874188649",
        "confession": "Test confession",
        "deleted": 0,
        "userID": "635489d7b0fb9bd5eac307b3",
        "comments": [],
        "netVotes": 0,
        "createdAt": "2022-12-07T12:23:54.341Z",
        "updatedAt": "2022-12-07T12:23:54.341Z",
        "__v": 0,
        "userInteracted": 0,
        "userCreated": 0
      })
    }/>);
      const element = screen.getByTextId("confessionText");
      expect(element.confession).toBe("Test confession");
    });
})

// Upvote "upvote"

// Downvote "downvote"

// Number of comments "badge"

// Number of comments "comments"

// Garbage visibility  "delete"
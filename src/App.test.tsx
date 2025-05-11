import { render, screen } from "@testing-library/react";
import UserStatistics from "./Components/UserStatistics";

test("displays the correct number of blogs written by the user", () => {
  const numberOfBlogs = 5; // Example number of blogs
  const { getByTestId } = render(<UserStatistics />);
  const blogsElement = getByTestId("blogs-count");
  expect(blogsElement).toHaveTextContent(`Number of Blogs: ${numberOfBlogs}`);
});

export {};

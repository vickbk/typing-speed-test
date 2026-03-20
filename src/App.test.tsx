import { render, screen } from "@testing-library/react";
import App from "./App";
import { checkHeadingOrder, drawRegion } from "./shared";

describe("Check headings", () => {
  test("should have one level 1 heading", async () => {
    render(<App />);
    const headers = await screen.findAllByRole("heading", { level: 1 });
    expect(headers).toHaveLength(1);
  });

  test("all headings should respect heading order", () => {
    const { container } = render(<App />);
    expect(checkHeadingOrder(drawRegion(container))).toBeTruthy();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { checkHeadingOrder, drawRegion } from "./shared";

describe("App Component", () => {
  describe("Rendering", () => {
    test("should render app without crashing", async () => {
      render(<App />);
      await expect(await screen.findByRole("banner")).toBeInTheDocument();
      await expect(await screen.findByRole("main")).toBeInTheDocument();
      await expect(
        await screen.findByRole("heading", {
          name: /Typing speed test. Type as fast as you can in 60 seconds/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility - Headings", () => {
    test("should have exactly one level 1 heading", async () => {
      render(<App />);
      const headers = await screen.findAllByRole("heading", { level: 1 });
      expect(headers).toHaveLength(1);
    });

    test("all headings should respect heading order", () => {
      const { container } = render(<App />);
      expect(checkHeadingOrder(drawRegion(container))).toBeTruthy();
    });
  });

  describe("Accessibility - Navigation", () => {
    test("should have accessible navigation landmarks", async () => {
      render(<App />);
      const banner = await screen.findByRole("banner");
      expect(banner).toBeInTheDocument();
    });

    test("navigation should be keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<App />);

      const main = await screen.findByRole("main");
      expect(main).toBeInTheDocument();

      await user.tab();

      expect(document.activeElement).not.toBe(document.body);
    });
  });

  describe("Accessibility - Semantic HTML", () => {
    test("should have semantic main element", async () => {
      render(<App />);
      const main = await screen.findByRole("main");
      expect(main.tagName).toBe("MAIN");
    });

    test("should have semantic header element", async () => {
      render(<App />);
      const header = await screen.findByRole("banner");
      expect(header.tagName).toBe("HEADER");
    });
  });

  describe("Accessibility - Screen Reader Support", () => {
    test("all buttons should be accessible", async () => {
      render(<App />);
      const buttons = screen.queryAllByRole("button");

      buttons.forEach((button) => {
        expect(button).toHaveAccessibleName();
      });
    });

    test("all links should have accessible names", async () => {
      render(<App />);
      const links = screen.queryAllByRole("link");

      links.forEach((link) => {
        const hasText = link.textContent?.trim().length ?? 0 > 0;
        const hasAriaLabel = link.getAttribute("aria-label");
        expect(hasText || hasAriaLabel).toBeTruthy();
      });
    });
  });

  describe("Context and State Management", () => {
    test("app should initialize default state", async () => {
      render(<App />);
      const main = await screen.findByRole("main");
      expect(main).toBeInTheDocument();
    });
  });

  describe("Content and Visibility", () => {
    test("rendered content should be visible", async () => {
      const { container } = render(<App />);

      expect(container.firstChild).toBeTruthy();
    });

    test("should not have display:none as primary content", async () => {
      const { container } = render(<App />);
      const main = container.querySelector("main");

      if (main) {
        const computedStyle = window.getComputedStyle(main);
        expect(computedStyle.display).not.toBe("none");
      }
    });
  });

  describe("Performance and Structure", () => {
    test("should mount app without critical errors", async () => {
      expect(() => render(<App />)).not.toThrow();
    });

    test("app should complete initial render", async () => {
      render(<App />);

      await expect(screen.getByRole("banner")).toBeInTheDocument();
    });
  });
});

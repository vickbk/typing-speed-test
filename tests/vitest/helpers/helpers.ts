import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export async function shouldSee(...textes: (string | RegExp)[]) {
  const elements: HTMLElement[] = [];
  for (const text of textes) {
    const element = await screen.findByText(text);
    expect(element).toBeInTheDocument();
    elements.push(element);
  }
  return elements;
}

export async function shouldNotSee(...textes: (string | RegExp)[]) {
  for (const text of textes)
    expect(screen.queryByText(text)).not.toBeInTheDocument();
}

export async function clickOn(element: HTMLElement) {
  const user = await userEvent.setup();
  await user.click(element);
}

/**
 * Common constants
 */

export const HOOK_CALLER = document.createElement("div");

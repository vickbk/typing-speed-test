import { screen } from "@testing-library/react";

export async function shouldSee(...textes: (string | RegExp)[]) {
  for (const text of textes)
    expect(await screen.findByText(text)).toBeInTheDocument();
}

export async function shouldNotSee(...textes: (string | RegExp)[]) {
  for (const text of textes)
    expect(screen.queryByText(text)).not.toBeInTheDocument();
}

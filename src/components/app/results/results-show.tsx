import { Article } from "@/components/shared/Article";
import { Heading } from "@/components/shared/Heading";
import type React from "react";

export function ResultsShow({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Article className="border rounded-lg p-4 px-6 b-neutral-500">
      <Heading className="text-2xl mb-2 c-neutral-400">{title}</Heading>
      <p className="text-3xl font-semibold">{children}</p>
    </Article>
  );
}

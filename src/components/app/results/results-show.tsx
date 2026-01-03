import type React from "react";
import { Article } from "../../shared/Article";
import { Heading } from "../../shared/Heading";

export function ResultsShow({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Article>
      <Heading>{title}</Heading>
      {children}
    </Article>
  );
}

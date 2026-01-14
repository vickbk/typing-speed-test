import { Article } from "@/components/shared/Article";
import { Heading } from "@/components/shared/Heading";
import { TypingContext } from "@/contexts/TypingContext";
import { useContext } from "react";

export const TextToEdit = () => {
  const {
    state: { text, input = "" },
  } = useContext(TypingContext);

  const current = input?.length || 0;
  return (
    <Article className="grow overflow-y-auto max-h-full relative">
      <Heading className="sr-only">Here is the text you will be typing</Heading>
      <p className="text-3xl c-neutral-500">
        {text.split("").map((char, index) => (
          <span
            className={[
              current === index ? "neutral-800 animate-pulse" : "",
              char === input?.charAt(index)
                ? "c-green-500"
                : index < input.length
                ? "c-red-500 underline"
                : "",
            ].join(" ")}
            key={index}
          >
            {input?.[index] ?? char}
          </span>
        ))}
      </p>
    </Article>
  );
};

import { Icon } from "@/components/common/bi-icon";
import { Article } from "@/components/shared/Article";
import { Heading } from "@/components/shared/Heading";
import { TypingContext } from "@/contexts/TypingContext";
import { joinClasses } from "@/libs/other-helpers";
import { useContext } from "react";

function scrollIntoView(node: HTMLElement | null) {
  node?.scrollIntoView({ block: "center", behavior: "instant" });
}
export const TextToEdit = () => {
  const {
    state: { text, input = "", oldMistakes },
  } = useContext(TypingContext);

  const current = input?.length || 0;
  return (
    <Article className="grow overflow-y-auto max-h-full relative py-8">
      <Heading className="sr-only">Here is the text you will be typing</Heading>
      <p className="text-2xl sm:text-5xl c-neutral-500">
        {text.split("").map((char, index) => {
          const [inputC, oldC] = [input, oldMistakes].map((t) =>
            t.charAt(index)
          );
          const activeClasses = [
            current === index && "neutral-800 animate-pulse",
            (char === inputC && "c-green-500") ||
              (index < input.length && "c-red-500 underline"),
            char === inputC && oldC !== "" && char !== oldC && "yellow-400",
          ];
          return (
            <>
              {char !== "\n" ? (
                <span
                  className={joinClasses(activeClasses)}
                  key={index}
                  ref={current === index ? scrollIntoView : undefined}
                >
                  {input?.[index] ?? char}
                </span>
              ) : (
                <>
                  {" "}
                  <Icon
                    key={index}
                    name={joinClasses(["arrow-return-left", ...activeClasses])}
                  />
                  <br key={index + 2000} />
                </>
              )}
            </>
          );
        })}
      </p>
    </Article>
  );
};

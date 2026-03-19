import { useTypingCtx } from "@/features";
import { joinClasses } from "@/libs/other-helpers";
import {
  Article,
  Heading,
} from "@/shared/heading-manager/components/heading-managers";
import { Icon } from "@/shared/helpers/components/bi-icon";
import { Fragment } from "react";

function scrollIntoView(node: HTMLElement | null) {
  node?.scrollIntoView({ block: "center", behavior: "instant" });
}
export const TextToEdit = () => {
  const {
    state: { text, input = "", oldMistakes },
  } = useTypingCtx();

  const currentIndex = input?.length || 0;
  return (
    <Article
      className="grow overflow-y-clip max-h-full relative py-8 break-word"
      tabIndex={0}
    >
      <Heading className="sr-only">Here is the text you will be typing</Heading>
      <p className="text-2xl sm:text-5xl c-neutral-500 break-word">
        {text.split("").map((char, index) => {
          const [inputChar, oldChar] = [input, oldMistakes].map((t) =>
            t.charAt(index),
          );
          const activeClasses = [
            currentIndex === index && "neutral-800 animate-pulse",
            (char === inputChar && "c-green-500") ||
              (index < input.length && "c-red-500 underline"),
            char === inputChar &&
              oldChar !== "" &&
              char !== oldChar &&
              "yellow-400 opacity-80",
          ];
          return (
            <Fragment key={index}>
              {char !== "\n" ? (
                <span
                  className={joinClasses(activeClasses)}
                  ref={currentIndex === index ? scrollIntoView : undefined}
                >
                  {input?.[index] ?? char}
                </span>
              ) : (
                <>
                  {" "}
                  <Icon
                    name={joinClasses(["arrow-return-left", ...activeClasses])}
                  />
                  <br />
                </>
              )}
            </Fragment>
          );
        })}
      </p>
    </Article>
  );
};

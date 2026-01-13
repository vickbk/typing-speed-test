import { Article } from "@/components/shared/Article";
import { Heading } from "@/components/shared/Heading";

export const ResultsShower = ({
  index,
  value,
  valueColor = "",
}: {
  index: React.ReactNode;
  value: string;
  valueColor?: string;
}) => {
  return (
    <Article className="grow not-first:border-l b-neutral-500 sm:flex sm:gap-2 lg:grow-0 lg:not-first:pl-4 lg:not-last:pr-4 items-center justify-center">
      <Heading className="c-neutral-400 sm:text-xl">{index}:</Heading>
      <p className={"font-bold text-3xl sm:text-xl " + valueColor}>{value}</p>
    </Article>
  );
};

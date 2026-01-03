import { Article } from "../../../../shared/Article";
import { Heading } from "../../../../shared/Heading";

export const ResultsShower = ({
  index,
  value,
}: {
  index: React.ReactNode;
  value: string;
}) => {
  return (
    <Article className="grow not-first:border-l b-neutral-500">
      <Heading className="c-neutral-400">{index}:</Heading>
      <p className="font-bold text-3xl">{value}</p>
    </Article>
  );
};

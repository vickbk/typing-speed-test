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
    <Article className="grow not-first:border-l">
      <Heading>{index}</Heading>
      <p className="font-bold text-3xl">{value}</p>
    </Article>
  );
};

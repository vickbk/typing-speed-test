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
    <Article>
      <Heading>{index}</Heading>
      <p>{value}</p>
    </Article>
  );
};

import { SROnly } from "../../../../shared/SROnly";
import { ResultsShower } from "./result-shower";

export const WordPerMinute = () => {
  return (
    <ResultsShower
      index={
        <>
          W<SROnly>ord </SROnly>P<SROnly>er </SROnly>M<SROnly>inute</SROnly>
        </>
      }
      value="0"
    />
  );
};

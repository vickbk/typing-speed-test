import { Main } from "../../shared/Main";
import completed from "../../../assets/images/icon-personal-best.svg";
import { Heading } from "../../shared/Heading";
import { Icon } from "../../common/bi-icon";
import ResultsStats from "./results-stats";

export const ResultsLanding = () => {
  return (
    <Main>
      <header>
        <img src={completed} alt="" />
        <Heading>Test Completed</Heading>
        <p>Solid run. Keeo pushing to beat your high score.</p>
      </header>
      <section>
        <ResultsStats />
      </section>
      <button type="button">
        Go Again <Icon name="arrow-counterclockwise" />
      </button>
    </Main>
  );
};

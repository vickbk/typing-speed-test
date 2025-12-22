import { Article } from "../../../shared/Article";
import { Heading } from "../../../shared/Heading";
import { SROnly } from "../../../shared/SROnly";

export const ChallengeOptions = () => {
  return (
    <Article>
      <Heading>
        <SROnly>Select your </SROnly>Difficulty<SROnly> level</SROnly>:
      </Heading>
      <ul>
        {["easy", "medium", "hard"].map((level) => (
          <li key={level}>
            <label>
              <input
                type="radio"
                name="level"
                value={level}
                defaultChecked
                className="sr-only"
              />{" "}
              {level}
            </label>
          </li>
        ))}
      </ul>
    </Article>
  );
};

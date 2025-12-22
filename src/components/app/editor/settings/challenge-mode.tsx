import { Article } from "../../../shared/Article";
import { Heading } from "../../../shared/Heading";
import { SROnly } from "../../../shared/SROnly";

export const ChallengeMode = () => {
  return (
    <Article>
      <Heading>
        <SROnly>Select your challenge </SROnly>Mode:
      </Heading>
      <ul>
        {[15, 30, 60, 120, ""].map((value) => (
          <li key={value}>
            <label>
              <input
                type="radio"
                name="mode"
                value={value}
                defaultChecked
                className="sr-only"
              />{" "}
              {value !== "" ? `Timed (${value}s)` : "Passage"}
            </label>
          </li>
        ))}
      </ul>
    </Article>
  );
};

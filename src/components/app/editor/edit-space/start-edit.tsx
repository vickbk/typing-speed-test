import { Article } from "../../../shared/Article";
import { Heading } from "../../../shared/Heading";
import { SROnly } from "../../../shared/SROnly";

export const StartEdit = () => {
  return (
    <Article>
      <Heading>
        <button type="button">Start Typing Text</button>
      </Heading>
      <p>
        Or <SROnly>You can</SROnly> click the text and start typing
      </p>
    </Article>
  );
};

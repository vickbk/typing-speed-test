import { Article } from "../../../shared/Article";
import { Heading } from "../../../shared/Heading";
import { SROnly } from "../../../shared/SROnly";

export const StartEdit = () => {
  return (
    <Article className="absolute inset-0 flex flex-col gap-4 justify-center items-center backdrop-blur-xs isolate">
      <Heading>
        <button type="button" className="p-4">
          Start Typing Text
        </button>
      </Heading>
      <p>
        Or <SROnly>You can</SROnly> click the text and start typing
      </p>
    </Article>
  );
};

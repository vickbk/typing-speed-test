import { Icon } from "../../../common/bi-icon";
import { Article } from "../../../shared/Article";
import { Heading } from "../../../shared/Heading";
import { SROnly } from "../../../shared/SROnly";

export const StartEdit = () => {
  return (
    <>
      <Article className="absolute inset-0 flex flex-col gap-4 justify-center items-center text-center backdrop-blur-xs isolate">
        <Heading>
          <button
            type="button"
            className="p-4 px-8 blue-600 rounded-xl text-2xl font-normal"
          >
            Start Typing Text
          </button>
        </Heading>
        <p className="text-xl">
          Or <SROnly>You can</SROnly> click the text and start typing
        </p>
      </Article>
      <Article className="self-center mt-4">
        <button type="button" className="p-2 px-4 border rounded-lg">
          <Icon name="arrow-clockwise" /> Reset
        </button>
      </Article>
    </>
  );
};

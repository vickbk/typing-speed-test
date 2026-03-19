import {
  Article,
  Heading,
} from "@/shared/heading-manager/components/heading-managers";
import { SROnly } from "@/shared/helpers/components/SROnly";
import { useStartEdit } from "../hooks";

export const StartEdit = () => {
  const { dispatch } = useStartEdit();

  return (
    <Article className="absolute inset-0 flex flex-col gap-4 justify-center items-center text-center backdrop-blur-sm isolate">
      <Heading>
        <button
          onClick={() => dispatch({ action: "startTyping" })}
          type="button"
          className="p-4 px-8 blue-600 border-3 hover:outline-3 focus:outline-3 active:outline-3 b-background active-out-blue-600  rounded-xl text-2xl font-normal"
        >
          <span className="absolute inset-0"></span>
          Start Typing Test
        </button>
      </Heading>
      <p className="text-xl">
        Or <SROnly>You can</SROnly> click the text and start typing
      </p>
    </Article>
  );
};

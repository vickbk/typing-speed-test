import { useContext } from "react";
import { Article } from "../../../shared/Article";
import { StartEdit } from "./start-edit";
import { TextToEdit } from "./text-to-edit";
import { TypingContext } from "../../../../contexts/TypingContext";
import { Icon } from "../../../common/bi-icon";

export const EditSpace = () => {
  const {
    state: { typing },
    dispatch,
  } = useContext(TypingContext);
  return (
    <Article className="border-t b-neutral-500 py-4 relative isolate grow flex flex-col">
      <TextToEdit />
      {!typing && <StartEdit />}

      {typing && (
        <div className="border-t b-neutral-500 pt-4">
          <button
            type="button"
            onClick={() => dispatch({ action: "startTyping" })}
            className="p-2 px-4 mx-auto block border rounded-lg"
          >
            <Icon name="arrow-clockwise" /> Reset
          </button>
        </div>
      )}
    </Article>
  );
};

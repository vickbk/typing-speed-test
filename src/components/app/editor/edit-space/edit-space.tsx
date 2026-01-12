import { useContext } from "react";
import { Article } from "../../../shared/Article";
import { StartEdit } from "./start-edit";
import { TextToEdit } from "./text-to-edit";
import { TypingContext } from "../../../../contexts/TypingContext";
import { Editor } from "./editor";

export const EditSpace = () => {
  const {
    state: { typing },
  } = useContext(TypingContext);
  return (
    <Article className="border-t b-neutral-500 py-4 relative isolate grow flex flex-col">
      <TextToEdit />
      {!typing && <StartEdit />}
      {typing && <Editor />}
    </Article>
  );
};

import { Article } from "@/components/shared/Article";
import { TypingContext } from "@/contexts/TypingContext";
import { useContext } from "react";
import { Editor } from "./editor";
import { StartEdit } from "./start-edit";
import { TextToEdit } from "./text-to-edit";

export const EditSpace = () => {
  const {
    state: { typing },
  } = useContext(TypingContext);
  return (
    <Article className="border-t b-neutral-500 py-4 relative isolate grow flex flex-col">
      {typing && <Editor />}
      <TextToEdit />
      {!typing && <StartEdit />}
    </Article>
  );
};

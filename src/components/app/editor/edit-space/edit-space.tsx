import { TypingContext } from "@/contexts/TypingContext";
import { useContext } from "react";
import { EditorControllers } from "./editor-controllers";
import { StartEdit } from "./start-edit";
import { TextToEdit } from "./text-to-edit";
import { EditTextField } from "./edit-text-field";

export const EditSpace = () => {
  const {
    state: { typing },
  } = useContext(TypingContext);
  return (
    <section className="border-t b-neutral-500 py-4 relative isolate grow flex flex-col overflow-y-auto max-h-[80vh]">
      {typing && <EditTextField />}
      <TextToEdit />
      {!typing ? <StartEdit /> : <EditorControllers />}
    </section>
  );
};

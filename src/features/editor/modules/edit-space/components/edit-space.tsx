import { useTypingCtx } from "@/features/typing-speed";
import { EditTextField } from "./edit-text-field";
import { EditorControllers } from "./editor-controllers";
import { StartEdit } from "./start-edit";
import { TextToEdit } from "./text-to-edit";

export const EditSpace = () => {
  const {
    state: { typing },
  } = useTypingCtx();
  return (
    <section className="border-t b-neutral-500 py-4 relative isolate grow flex flex-col overflow-y-auto max-h-[80vh]">
      {typing && <EditTextField />}
      <TextToEdit />
      {!typing ? <StartEdit /> : <EditorControllers />}
    </section>
  );
};

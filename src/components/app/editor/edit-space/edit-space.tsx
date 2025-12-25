import { Article } from "../../../shared/Article";
import { StartEdit } from "./start-edit";
import { TextToEdit } from "./text-to-edit";

export const EditSpace = () => {
  return (
    <Article className="py-4 relative isolate grow flex flex-col">
      <TextToEdit />
      <StartEdit />
    </Article>
  );
};

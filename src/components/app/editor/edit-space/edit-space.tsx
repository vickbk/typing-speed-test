import { Article } from "../../../shared/Article";
import { StartEdit } from "./start-edit";
import { TextToEdit } from "./text-to-edit";

export const EditSpace = () => {
  return (
    <Article className="border-y py-4 relative isolate grow">
      <TextToEdit />
      <StartEdit />
    </Article>
  );
};

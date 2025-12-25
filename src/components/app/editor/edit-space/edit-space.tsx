import { Article } from "../../../shared/Article";
import { StartEdit } from "./start-edit";
import { TextToEdit } from "./text-to-edit";

export const EditSpace = () => {
  return (
    <Article>
      <TextToEdit />
      <StartEdit />
    </Article>
  );
};

import { Article } from "../../../shared/Article";
import { Heading } from "../../../shared/Heading";

export const TextToEdit = () => {
  const text = "Text to edit goes here.";
  return (
    <Article className="border-y grow">
      <Heading className="sr-only">Here is the text you will be typing</Heading>
      <p>
        {text.split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </p>
    </Article>
  );
};

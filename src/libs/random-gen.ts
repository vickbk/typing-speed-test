import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum();
export function getRandomText() {
  return {
    word: lorem.generateWords(1),
    sentence: lorem.generateSentences(),
    paragraph: lorem.generateParagraphs(1),
  };
}

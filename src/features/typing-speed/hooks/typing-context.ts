import { createContext } from "react";
import { useTypingSpeed } from "./use-typing-speed";

export const TypingContext = createContext(useTypingSpeed());

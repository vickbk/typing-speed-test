import { TypingContext, useTypingSpeed } from "@/features/typing-speed";
import { HeadingCtx } from "@/shared";
import { BrowserRouter } from "react-router-dom";

export const ContextProvider = () => {
  return (
    <BrowserRouter basename={!import.meta.env.DEV ? "/typing-speed-test" : ""}>
      <HeadingCtx.Provider value={0}>
        <TypingContext.Provider
          value={useTypingSpeed()}
        ></TypingContext.Provider>
      </HeadingCtx.Provider>
    </BrowserRouter>
  );
};

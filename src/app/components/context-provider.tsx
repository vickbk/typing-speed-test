import { TypingContext, useTypingSpeed } from "@/features";
import { Header } from "@/features/header/components/header";
import { HeadingCtx } from "@/shared";
import { BrowserRouter } from "react-router-dom";
import "../styles/global.css";
import "../styles/scss/global.scss";
import { AppRoutes } from "./app-routes";

export const ContextProvider = () => {
  return (
    <BrowserRouter basename={!import.meta.env.DEV ? "/typing-speed-test" : ""}>
      <HeadingCtx.Provider value={0}>
        <TypingContext.Provider value={useTypingSpeed()}>
          <Header />
          <AppRoutes />
        </TypingContext.Provider>
      </HeadingCtx.Provider>
    </BrowserRouter>
  );
};

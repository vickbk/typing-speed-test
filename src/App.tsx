import { EditorSetup } from "./components/app/editor/edittor-setup";
import { Header } from "./components/app/header/header";
import { HeadingCtx } from "./contexts/HeadingCtx";
import { useTypingSpeed } from "./hooks/handle-typing-speed";
import "./styles/global.css";
import "./styles/scss/global.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TypingContext } from "./contexts/TypingContext";
import { ScoreHistory } from "./components/app/header/score-history";
import { ErrorElement } from "./components/common/error-element";

function App() {
  const stateSetter = useTypingSpeed();
  return (
    <>
      <BrowserRouter basename="/typing-speed-test">
        <HeadingCtx value={0}>
          <TypingContext value={stateSetter}>
            <Header />
            <Routes>
              <Route path="/" element={<EditorSetup />}>
                <Route index element={<Navigate replace to={"home"} />} />
                <Route path="history" element={<ScoreHistory />} />
                <Route path="home" />
                <Route
                  path="*"
                  element={
                    <ErrorElement error={new Error("404 | Page not found")} />
                  }
                />
              </Route>
            </Routes>
          </TypingContext>
        </HeadingCtx>
      </BrowserRouter>
    </>
  );
}

export default App;

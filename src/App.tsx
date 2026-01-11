import { EditorSetup } from "./components/app/editor/edittor-setup";
import { Header } from "./components/app/header/header";
import { HeadingCtx } from "./contexts/HeadingCtx";
import { useTypingSpeed } from "./hooks/handle-typing-speed";
import "./styles/global.css";
import "./styles/scss/global.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TypingContext } from "./contexts/TypingContext";

function App() {
  const stateSetter = useTypingSpeed();
  return (
    <>
      <BrowserRouter basename="/typing-speed-test">
        <HeadingCtx value={0}>
          <TypingContext value={stateSetter}>
            <Header />
            <Routes>
              <Route path="/" element={<EditorSetup />} />
            </Routes>
          </TypingContext>
        </HeadingCtx>
      </BrowserRouter>
    </>
  );
}

export default App;

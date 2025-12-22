import { Header } from "./components/app/header/header";
import { HeadingCtx } from "./contexts/HeadingCtx";
import "./styles/global.css";
import "./styles/scss/global.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter basename="/typing-speed-test">
        <HeadingCtx value={0}>
          <Header />
          <Routes>
            <Route path="/" element={<></>} />
          </Routes>
        </HeadingCtx>
      </BrowserRouter>
    </>
  );
}

export default App;

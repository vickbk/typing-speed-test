import { HeadingCtx } from "./contexts/HeadingCtx";
import "./styles/global.css";
import "./styles/scss/global.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeadingCtx value={0}>
          <Routes>
            <Route path="/" element={<></>} />
          </Routes>
        </HeadingCtx>
      </BrowserRouter>
    </>
  );
}

export default App;

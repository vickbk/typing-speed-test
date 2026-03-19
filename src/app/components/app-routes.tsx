import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <BrowserRouter basename={!import.meta.env.DEV ? "/typing-speed-test" : ""}>
      <Routes>
        <Route path="/" element={<EditorSetup />}>
          <Route index element={<Navigate replace to={"home"} />} />
          <Route path="history" element={<ScoreHistory />} />
          <Route path="home" />
          <Route
            path="*"
            element={<ErrorElement error={new Error("404 | Page not found")} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

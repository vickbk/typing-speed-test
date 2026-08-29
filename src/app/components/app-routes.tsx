import { EditorSetup } from "@/features/editor/components/editor-setup";
import { ErrorElement } from "@/features/error/components/error-element";
import { ScoreHistory } from "@/features/history/components/score-history";
import { useRouteWithSearch } from "@/shared";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  const { keepQuery } = useRouteWithSearch();

  return (
    <Routes>
      <Route path="/" element={<EditorSetup />}>
        <Route index element={<Navigate replace to={keepQuery("home")} />} />
        <Route path="history" element={<ScoreHistory />} />
        <Route path="home" element={<></>} />
        <Route
          path="*"
          element={<ErrorElement error={new Error("404 | Page not found")} />}
        />
      </Route>
    </Routes>
  );
};

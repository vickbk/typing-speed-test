import { EditorSetup } from "@/components/app/editor/edittor-setup";
import { ErrorElement } from "@/features/error/components/error-element";
import { ScoreHistory } from "@/features/history/components/score-history";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
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
  );
};

import { EditorSetup } from "@/components/app/editor/edittor-setup";
import { ScoreHistory } from "@/components/app/history/score-history";
import { ErrorElement } from "@/components/common/error-element";
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

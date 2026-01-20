import { TypingContext } from "@/contexts/TypingContext";
import { useContext } from "react";
import { SettingBar } from "./settings/settings-bar";
import { EditSpace } from "./edit-space/edit-space";
import { ResultsLanding } from "../results/results-landing";
import { Outlet } from "react-router-dom";

export const EditorSetup = () => {
  const {
    state: { finish },
  } = useContext(TypingContext);

  return (
    <main className="flex flex-col pb-4 max-w-300 mx-auto">
      {!finish ? (
        <>
          <SettingBar />
          <EditSpace />
        </>
      ) : (
        <ResultsLanding />
      )}
      <Outlet />
    </main>
  );
};

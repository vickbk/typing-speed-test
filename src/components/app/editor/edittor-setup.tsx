import { useTypingCtx } from "@/features";
import { Outlet } from "react-router-dom";
import { ResultsLanding } from "../../../features/results/components/results-landing";
import { EditSpace } from "./edit-space/edit-space";
import { SettingBar } from "./settings/settings-bar";

export const EditorSetup = () => {
  const {
    state: { finish },
  } = useTypingCtx();

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

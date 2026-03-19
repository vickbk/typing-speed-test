import { useTypingCtx } from "@/features";
import { Outlet } from "react-router-dom";
import { EditSpace } from "../../../features/editor/modules/edit-space/components/edit-space";
import { ResultsLanding } from "../../../features/results/components/results-landing";
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

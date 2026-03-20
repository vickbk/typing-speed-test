import { ResultsLanding } from "@/features/results/components/results-landing";
import { useTypingCtx } from "@/features/typing-speed";
import { Outlet } from "react-router-dom";
import { EditSpace } from "../modules/edit-space/components/edit-space";
import { SettingBar } from "../modules/settings/components/settings-bar";

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

import { useTypingCtx } from "@/features";
import { EditSpace } from "@/features/editor/modules/edit-space/components/edit-space";
import { SettingBar } from "@/features/editor/modules/settings/components/settings-bar";
import { ResultsLanding } from "@/features/results/components/results-landing";
import { Outlet } from "react-router-dom";

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

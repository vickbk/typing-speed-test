import { Main } from "@/components/shared/Main";
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
    <>
      <Main className="flex flex-col pb-4">
        {!finish && (
          <>
            <SettingBar />
            <EditSpace />
          </>
        )}

        {finish && <ResultsLanding />}
        <Outlet />
      </Main>
    </>
  );
};

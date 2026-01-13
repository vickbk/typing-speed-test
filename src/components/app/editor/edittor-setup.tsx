import { useContext } from "react";
import { Main } from "../../shared/Main";
import { ResultsLanding } from "../results/results-landing";
import { EditSpace } from "./edit-space/edit-space";
import { SettingBar } from "./settings/settings-bar";
import { TypingContext } from "../../../contexts/TypingContext";

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
      </Main>
    </>
  );
};

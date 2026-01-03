import { Main } from "../../shared/Main";
import { ResultsLanding } from "../results/results-landing";
import { EditSpace } from "./edit-space/edit-space";
import { SettingBar } from "./settings/settings-bar";

export const EditorSetup = () => {
  return (
    <>
      <Main className="flex flex-col pb-4 hidden">
        <SettingBar />
        <EditSpace />
      </Main>
      <ResultsLanding />
    </>
  );
};

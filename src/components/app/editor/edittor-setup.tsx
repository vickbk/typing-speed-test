import { Main } from "../../shared/Main";
import { EditSpace } from "./edit-space/edit-space";
import { SettingBar } from "./settings/settings-bar";

export const EditorSetup = () => {
  return (
    <Main className="flex flex-col pb-4">
      <SettingBar />
      <EditSpace />
    </Main>
  );
};

import { Icon } from "@/components/common/bi-icon";
import { Article } from "@/components/shared/Article";
import CustomDialog from "@/components/shared/CustomDialog";
import { Heading } from "@/components/shared/Heading";
import { SROnly } from "@/components/shared/SROnly";

export const ScoreHistory = ({
  onClose,
}: {
  onClose: (param: false) => void;
}) => {
  function closeDialog() {
    onClose(false);
  }
  return (
    <CustomDialog
      className="m-auto p-4 rounded-lg background c-foreground relative"
      isOpen
      onClose={closeDialog}
    >
      <Article>
        <button
          className="rounded-full active-button aspect-square px-1 absolute right-0"
          type="button"
          onClick={closeDialog}
        >
          <SROnly>Close History</SROnly>
          <Icon name="x" />
        </button>
        <Heading>Score History</Heading>
        <p>Results will go here!</p>
      </Article>
    </CustomDialog>
  );
};

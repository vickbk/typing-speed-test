import { Icon } from "@/components/common/bi-icon";
import { useTypingCtx } from "@/features";
import { clearMemoItem } from "@/shared";
import { SROnly } from "@/shared/helpers/components/SROnly";

export const ClearButton = () => {
  const {
    dispatch,
    state: { difficulty },
  } = useTypingCtx();
  return (
    <button
      type="button"
      className="active-button px-4 rounded-lg outline-1"
      onClick={() => {
        clearMemoItem(`score.${difficulty}`);
        dispatch({ action: "updateHighScore", payload: 0 });
      }}
    >
      <SROnly>Clear History</SROnly>
      <Icon name="trash" />
    </button>
  );
};

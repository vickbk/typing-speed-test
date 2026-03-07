import { Icon } from "@/components/common/bi-icon";
import { SROnly } from "@/components/shared/SROnly";
import { TypingContext } from "@/contexts/TypingContext";
import { clearMemoItem } from "@/shared";
import { useContext } from "react";

export const ClearButton = () => {
  const {
    dispatch,
    state: { difficulty },
  } = useContext(TypingContext);
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

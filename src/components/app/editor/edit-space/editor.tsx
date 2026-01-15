import { Icon } from "@/components/common/bi-icon";
import { TypingContext } from "@/contexts/TypingContext";
import { useContext } from "react";

export const Editor = () => {
  const { dispatch } = useContext(TypingContext);

  return (
    <div className="border-t b-neutral-500 pt-4">
      <button
        type="button"
        onClick={() => {
          dispatch({ action: "updateInput", payload: "" });
          dispatch({ action: "startTyping" });
        }}
        className="p-2 px-4 mx-auto block border rounded-lg active-button"
      >
        Restart Test <Icon name="arrow-counterclockwise" />
      </button>
    </div>
  );
};

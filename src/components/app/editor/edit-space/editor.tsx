import { Icon } from "@/components/common/bi-icon";
import { TypingContext } from "@/contexts/TypingContext";
import { useContext } from "react";

export const Editor = () => {
  const { dispatch } = useContext(TypingContext);

  return (
    <div className="border-t b-neutral-500 pt-4 flex flex-wrap justify-center gap-4">
      <button
        type="button"
        onClick={() => {
          dispatch({ action: "updateInput", payload: "" });
          dispatch({ action: "startTyping" });
        }}
        className="p-2 px-4 border rounded-lg active-button  grow sm:grow-0"
      >
        Restart Test <Icon name="arrow-counterclockwise" />
      </button>
      <button
        type="button"
        onClick={() => dispatch({ action: "stopTyping" })}
        className="p-2 px-4 c-red-500 active-button outline rounded-lg active-button grow sm:grow-0"
      >
        Cancel <Icon name="x-octagon" />
      </button>
    </div>
  );
};

import { Icon } from "@/components/common/bi-icon";
import { useTypingCtx } from "@/features";

export const EditorControllers = () => {
  const { dispatch } = useTypingCtx();

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
        className="p-2 px-4 out-red-500 active-button outline rounded-lg active-button grow sm:grow-0"
      >
        Cancel <Icon name="x-octagon c-red-500" />
      </button>
    </div>
  );
};

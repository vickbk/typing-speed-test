import { useEditorField } from "../hooks";

export const EditTextField = () => {
  const { textarea, dispatch, input } = useEditorField();

  return (
    <label className="sr-only">
      Typing area
      <textarea
        ref={textarea}
        onChange={(e) =>
          dispatch({ action: "updateInput", payload: e.target.value })
        }
        value={input}
      />
    </label>
  );
};

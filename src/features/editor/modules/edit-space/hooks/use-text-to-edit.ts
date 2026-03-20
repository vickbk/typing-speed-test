import { useTypingCtx } from "@/features/typing-speed";

function scrollIntoView(node: HTMLElement | null) {
  node?.scrollIntoView({ block: "center", behavior: "instant" });
}

export function useTextToEdit() {
  const { state } = useTypingCtx();

  return { ...state, currentIndex: state.input?.length || 0, scrollIntoView };
}

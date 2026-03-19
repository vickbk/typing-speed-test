import {
  calculateAccuracy,
  calculateWPM,
  type AppState,
} from "@/features/typing-speed";

export function useResultsStats({ state }: { state: AppState }) {
  const [WPM, accuracy] = [calculateWPM, calculateAccuracy].map((func) =>
    func(state),
  );

  return { WPM, accuracy, ...state };
}

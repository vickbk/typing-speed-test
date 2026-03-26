import {
  TypingContext,
  useTypingSpeed,
  type AppState,
} from "@/features/typing-speed";
import { getMockState } from "@/features/typing-speed/scripts/test-helpers";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import { useChallengeOptions } from "./use-challenge-options";

describe("useChallengeOptions", () => {
  it("should have difficulty options", () => {
    const { result } = renderHook(() => useChallengeOptions(), {
      wrapper: renderChallengeOptionsWrapper(),
    });

    expect(result.current.options).toBeDefined();
    expect(Array.isArray(result.current.options)).toBe(true);
  });

  it("should include all difficulty levels", () => {
    const { result } = renderHook(() => useChallengeOptions(), {
      wrapper: renderChallengeOptionsWrapper(),
    });

    ["easy", "medium", "hard", "quote", "code"].forEach((option) =>
      expect(result.current.options).toContain(option),
    );
  });

  it("should return current difficulty", () => {
    const { result } = renderHook(() => useChallengeOptions(), {
      wrapper: renderChallengeOptionsWrapper({ state: { difficulty: "hard" } }),
    });

    expect(result.current.difficulty).toBe("hard");
  });

  it("should have setDifficulty and loadDifficulty functions", () => {
    const { result } = renderHook(() => useChallengeOptions(), {
      wrapper: renderChallengeOptionsWrapper(),
    });

    (["setDifficulty", "loadDifficulty"] as const).forEach((func) =>
      expect(typeof result.current[func]).toBe("function"),
    );
  });

  it.each(["easy", "medium", "hard", "quote", "code"] as const)(
    "should initiate the state to the difficulty set in query (%s)",
    (difficulty) => {
      const { result } = renderHook(() => useChallengeOptions(), {
        wrapper: renderChallengeOptionsWrapper({ difficulty: difficulty }),
      });
      act(() => {
        result.current.loadDifficulty(document.createElement("div"));
      });
      expect(result.current.difficulty).toBe(difficulty);
    },
  );
});

function renderChallengeOptionsWrapper({
  state = {},
  difficulty = null,
}: {
  state?: Partial<AppState>;
  difficulty?: AppState["difficulty"] | null;
} = {}) {
  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter
      initialEntries={[difficulty !== null ? `?difficulty=${difficulty}` : ""]}
    >
      <TypingContext.Provider value={useTypingSpeed(getMockState(state))}>
        {children}
      </TypingContext.Provider>
    </MemoryRouter>
  );
}

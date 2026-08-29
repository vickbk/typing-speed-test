import {
  buildInitialState,
  TypingContext,
  useTypingSpeed,
  type AppState,
} from "@/features/typing-speed";
import { renderHook } from "@testing-library/react";
import { DIFFICULTIES, UNKNOWN_DIFFICULTIES } from "@tests/shared";
import { HOOK_CALLER } from "@tests/vitest";
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

  it.each(DIFFICULTIES)(
    "should initiate the state to the difficulty set in query (%s)",
    (difficulty) => {
      const { result } = renderHook(() => useChallengeOptions(), {
        wrapper: renderChallengeOptionsWrapper({
          difficulty: difficulty as AppState["difficulty"],
        }),
      });
      act(() => {
        result.current.loadDifficulty(HOOK_CALLER);
      });
      expect(result.current.difficulty).toBe(difficulty);
    },
  );

  it.each(UNKNOWN_DIFFICULTIES)(
    "should start in easy level for unkown difficulty in search string (%s)",
    (difficulty) => {
      const { result } = renderHook(() => useChallengeOptions(), {
        wrapper: renderChallengeOptionsWrapper({
          difficulty: difficulty as AppState["difficulty"],
        }),
      });
      act(() => {
        result.current.loadDifficulty(HOOK_CALLER);
      });
      expect(result.current.difficulty).toBe("easy");
    },
  );

  test.each(DIFFICULTIES)(
    "should persist difficulty on page reload (%s)",
    (difficulty) => {
      const { result } = renderHook(() => useChallengeOptions(), {
        wrapper: renderChallengeOptionsWrapper({
          difficulty: difficulty as AppState["difficulty"],
        }),
      });

      act(() => result.current.loadDifficulty(HOOK_CALLER));

      expect(result.current.difficulty).toBe(difficulty);

      const { result: rs } = renderHook(() => useChallengeOptions(), {
        wrapper: renderChallengeOptionsWrapper(),
      });
      act(() => rs.current.loadDifficulty(HOOK_CALLER));
      expect(rs.current.difficulty).toBe(difficulty);
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
      <TypingContext.Provider value={useTypingSpeed(buildInitialState(state))}>
        {children}
      </TypingContext.Provider>
    </MemoryRouter>
  );
}

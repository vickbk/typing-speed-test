import {
  TypingContext,
  useTypingSpeed,
  type AppState,
} from "@/features/typing-speed";
import { getMockState } from "@/features/typing-speed/scripts/test-helpers";
import { renderHook } from "@testing-library/react";
import { UNKNOWN_MODES } from "@tests/shared";
import { HOOK_CALLER } from "@tests/vitest";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import { useChallengeMode } from "./use-challenge-mode";

describe("useChallengeMode", () => {
  it("should have timing modes available", () => {
    const { result } = renderHook(() => useChallengeMode(), {
      wrapper: renderChallengeModeWrapper(),
    });

    expect(result.current.timingMode).toBeDefined();
    expect(result.current.timingMode.length).toBeGreaterThan(0);
  });

  it("should include timed and passage modes", () => {
    const { result } = renderHook(() => useChallengeMode(), {
      wrapper: renderChallengeModeWrapper(),
    });

    const modes = result.current.timingMode.map(([value]) => value);
    [15, 30, 60, 120, ""].forEach((mode) => expect(modes).toContain(mode));
  });

  it("should return current mode", () => {
    const { result } = renderHook(() => useChallengeMode(), {
      wrapper: renderChallengeModeWrapper({ state: { mode: 60 } }),
    });

    expect(result.current.mode).toBe(60);
  });

  it("should provide mode display text", () => {
    const { result } = renderHook(() => useChallengeMode(), {
      wrapper: renderChallengeModeWrapper(),
    });

    expect(result.current.modeDisplay).toBeDefined();
    expect(typeof result.current.modeDisplay).toBe("string");
  });

  it("should have setMode and loadMode functions", () => {
    const { result } = renderHook(() => useChallengeMode(), {
      wrapper: renderChallengeModeWrapper(),
    });

    (["setMode", "loadMode"] as const).forEach((func) =>
      expect(typeof result.current[func]).toBe("function"),
    );
  });

  it.each([15, 30, 60, 120, ""] as const)(
    "should initiate the state to the mode set in query (%s)",
    (mode) => {
      const { result } = renderHook(() => useChallengeMode(), {
        wrapper: renderChallengeModeWrapper({
          mode: mode,
        }),
      });

      act(() => result.current.loadMode(HOOK_CALLER));

      expect(result.current.mode).toBe(mode);
    },
  );

  it.each(UNKNOWN_MODES)(
    "should initiate in passage mode for unknown mode in query mode (%s)",
    (mode) => {
      const {
        result: { current },
      } = renderHook(() => useChallengeMode(), {
        wrapper: renderChallengeModeWrapper({ mode: mode as AppState["mode"] }),
      });
      act(() => current.loadMode(HOOK_CALLER));
      expect(current.mode).toBe("");
    },
  );
});

function renderChallengeModeWrapper({
  state = {},
  mode: mode = null,
}: {
  state?: Partial<AppState>;
  mode?: AppState["mode"] | null;
} = {}) {
  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[mode !== null ? `/?mode=${mode}` : ""]}>
      <TypingContext.Provider value={useTypingSpeed(getMockState(state))}>
        {children}
      </TypingContext.Provider>
    </MemoryRouter>
  );
}

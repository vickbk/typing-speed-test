import { getMemo, getMemoItem } from "./get-memo";
import { setMemoItem } from "./set-item";

describe("Memorization - getMemoItem", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should get item from localStorage", () => {
    setMemoItem("theme", "dark");
    const theme = getMemoItem("theme");
    expect(theme).toBe("dark");
  });

  it("should handle nested paths", () => {
    setMemoItem("user.profile.name", "John");
    const name = getMemoItem("user.profile.name");
    expect(name).toBe("John");
  });

  it("should return undefined for non-existent path", () => {
    setMemoItem("theme", "light");
    const result = getMemoItem("non.existent.path");
    expect(result).toBeUndefined();
  });

  it("should initialize empty object if localStorage item does not exist", () => {
    localStorage.clear();
    const memo = getMemo();
    expect(memo).toEqual({});
  });

  it("should accept type parameter", () => {
    interface UserProfile {
      name: string;
      age: number;
    }
    setMemoItem("profile", { name: "Jane", age: 25 });
    const profile = getMemoItem<UserProfile>("profile");
    expect(profile?.name).toBe("Jane");
    expect(profile?.age).toBe(25);
  });
});

import { getMemoItem } from "./get-memo";
import { setMemoItem } from "./set-item";

describe("Memorization - setMemoItem", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should set simple value", () => {
    setMemoItem("theme", "dark");
    expect(getMemoItem("theme")).toBe("dark");
  });

  it("should set nested value", () => {
    setMemoItem("user.profile.name", "John");
    expect(getMemoItem("user.profile.name")).toBe("John");
  });

  it("should update existing value", () => {
    setMemoItem("theme", "light");
    expect(getMemoItem("theme")).toBe("light");
    setMemoItem("theme", "dark");
    expect(getMemoItem("theme")).toBe("dark");
  });

  it("should create intermediate objects", () => {
    setMemoItem("a.b.c.d", 42);
    expect(getMemoItem("a.b.c.d")).toBe(42);
  });

  it("should handle multiple values", () => {
    setMemoItem("theme", "dark");
    setMemoItem("difficulty", "hard");
    setMemoItem("lang", "en");
    expect(getMemoItem("theme")).toBe("dark");
    expect(getMemoItem("difficulty")).toBe("hard");
    expect(getMemoItem("lang")).toBe("en");
  });

  it("should delete value when setting undefined", () => {
    setMemoItem("theme", "dark");
    setMemoItem("theme", undefined);
    expect(getMemoItem("theme")).toBeUndefined();
  });

  it("should handle complex objects", () => {
    const obj = { x: 1, y: 2, z: { nested: true } };
    setMemoItem("data", obj);
    const retrieved = getMemoItem("data");
    expect(retrieved).toEqual(obj);
  });

  it("should handle arrays", () => {
    const arr = [1, 2, 3, 4, 5];
    setMemoItem("numbers", arr);
    const retrieved = getMemoItem("numbers");
    expect(retrieved).toEqual(arr);
  });
});

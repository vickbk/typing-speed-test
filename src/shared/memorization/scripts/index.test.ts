import { beforeEach, describe, expect, it } from "vitest";
import { getMemo, getMemoItem, setMemoItem } from "./index";

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

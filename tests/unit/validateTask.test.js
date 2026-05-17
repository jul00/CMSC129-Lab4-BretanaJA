const { validateTask } = require("../../backend/validateTask");

describe("validateTask()", () => {
  test("accepts a valid task title", () => {
    // A valid title should return true
    expect(validateTask("Buy groceries")).toBe(true);
  });

  test("rejects an empty task title", () => {
    // An empty title should throw an error
    expect(() => validateTask("")).toThrow("Title cannot be empty");
  });

  test("rejects a task title longer than 50 characters", () => {
    const longTitle = "A".repeat(51); // Generates a 51-character string
    expect(() => validateTask(longTitle)).toThrow("Title cannot exceed 50 characters");
  });
});
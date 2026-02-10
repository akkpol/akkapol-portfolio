import { expect, test, describe, spyOn, beforeEach, type Mock } from "bun:test";
import { validateExperience } from "./validation";
import { Experience } from "@/types";

describe("validateExperience", () => {
  let consoleSpy: Mock<any>;

  beforeEach(() => {
    // Mock console.error to verify error messages and keep test output clean
    if (consoleSpy) {
      consoleSpy.mockClear();
    } else {
      consoleSpy = spyOn(console, "error").mockImplementation(() => {});
    }
  });

  test("should return true for a valid experience array", () => {
    const experiences: Experience[] = [
      {
        title: "Software Engineer",
        company: "Tech Corp",
        startDate: "2020-01",
        endDate: "Present",
        location: "Remote",
        highlights: ["Developed features"],
      },
    ];
    expect(validateExperience(experiences)).toBe(true);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test("should return true for an empty array", () => {
    expect(validateExperience([])).toBe(true);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test("should return false if title is missing", () => {
    const experiences: any[] = [
      {
        company: "Tech Corp",
        startDate: "2020-01",
        endDate: "Present",
        location: "Remote",
        highlights: [],
      },
    ];
    expect(validateExperience(experiences as Experience[])).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
    const errorMessage = consoleSpy.mock.calls[0][0];
    expect(errorMessage).toContain("Error: Experience 0 title is required");
  });

  test("should return false if title is empty string", () => {
    const experiences: Experience[] = [
      {
        title: "",
        company: "Tech Corp",
        startDate: "2020-01",
        endDate: "Present",
        location: "Remote",
        highlights: [],
      },
    ];
    expect(validateExperience(experiences)).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
    const errorMessage = consoleSpy.mock.calls[0][0];
    expect(errorMessage).toContain("Error: Experience 0 title is required");
  });

  test("should return false if title is only whitespace", () => {
    const experiences: Experience[] = [
      {
        title: "   ",
        company: "Tech Corp",
        startDate: "2020-01",
        endDate: "Present",
        location: "Remote",
        highlights: [],
      },
    ];
    expect(validateExperience(experiences)).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
    const errorMessage = consoleSpy.mock.calls[0][0];
    expect(errorMessage).toContain("Error: Experience 0 title is required");
  });

  test("should return false if company is missing", () => {
    const experiences: any[] = [
      {
        title: "Software Engineer",
        startDate: "2020-01",
        endDate: "Present",
        location: "Remote",
        highlights: [],
      },
    ];
    expect(validateExperience(experiences as Experience[])).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
    const errorMessage = consoleSpy.mock.calls[0][0];
    expect(errorMessage).toContain("Error: Experience 0 company is required");
  });

  test("should return false if company is empty string", () => {
    const experiences: Experience[] = [
      {
        title: "Software Engineer",
        company: "",
        startDate: "2020-01",
        endDate: "Present",
        location: "Remote",
        highlights: [],
      },
    ];
    expect(validateExperience(experiences)).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
    const errorMessage = consoleSpy.mock.calls[0][0];
    expect(errorMessage).toContain("Error: Experience 0 company is required");
  });

  test("should return false if any experience in the array is invalid", () => {
    const experiences: Experience[] = [
      {
        title: "Software Engineer",
        company: "Tech Corp",
        startDate: "2020-01",
        endDate: "Present",
        location: "Remote",
        highlights: [],
      },
      {
        title: "",
        company: "Other Corp",
        startDate: "2021-01",
        endDate: "2022-01",
        location: "Office",
        highlights: [],
      },
    ];
    expect(validateExperience(experiences)).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
    const errorMessage = consoleSpy.mock.calls[0][0];
    expect(errorMessage).toContain("Error: Experience 1 title is required");
  });
});

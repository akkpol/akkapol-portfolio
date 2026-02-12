import { expect, test, describe } from "bun:test";
import { validateExperience } from "./validation";
import { Experience } from "@/types";

describe("validateExperience", () => {
  test("should have no errors for a valid experience array", () => {
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
    const errors: string[] = [];
    validateExperience(experiences, errors);
    expect(errors.length).toBe(0);
  });

  test("should have no errors for an empty array", () => {
    const errors: string[] = [];
    validateExperience([], errors);
    expect(errors.length).toBe(0);
  });

  test("should add error if title is missing", () => {
    const experiences: any[] = [
      {
        company: "Tech Corp",
        startDate: "2020-01",
        endDate: "Present",
        location: "Remote",
        highlights: [],
      },
    ];
    const errors: string[] = [];
    validateExperience(experiences as Experience[], errors);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toContain("Experience[0]: title is required");
  });

  test("should add error if title is empty string", () => {
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
    const errors: string[] = [];
    validateExperience(experiences, errors);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toContain("Experience[0]: title is required");
  });

  test("should add error if title is only whitespace", () => {
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
    const errors: string[] = [];
    validateExperience(experiences, errors);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toContain("Experience[0]: title is required");
  });

  test("should add error if company is missing", () => {
    const experiences: any[] = [
      {
        title: "Software Engineer",
        startDate: "2020-01",
        endDate: "Present",
        location: "Remote",
        highlights: [],
      },
    ];
    const errors: string[] = [];
    validateExperience(experiences as Experience[], errors);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toContain("Experience[0]: company is required");
  });

  test("should add error if company is empty string", () => {
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
    const errors: string[] = [];
    validateExperience(experiences, errors);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toContain("Experience[0]: company is required");
  });

  test("should add error if any experience in the array is invalid", () => {
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
    const errors: string[] = [];
    validateExperience(experiences, errors);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toContain("Experience[1]: title is required");
  });
});

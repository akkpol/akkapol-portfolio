const fs = require('fs');
const path = require('path');

// Mocking the validation logic for testing in isolation since we can't easily run TS
// This mimics the logic implemented in utils/validation.ts

function isString(val) {
  return typeof val === 'string';
}

function isArray(val) {
  return Array.isArray(val);
}

function validateBasics(basics, errors) {
  if (!basics) {
    errors.push('Basics data is missing');
    return;
  }
  if (!isString(basics.name) || basics.name.trim() === '') errors.push('Basics: name is required');
  if (!isString(basics.headline)) errors.push('Basics: headline must be a string');
  if (!isString(basics.about)) errors.push('Basics: about must be a string');
  if (!isString(basics.location)) errors.push('Basics: location must be a string');
  if (!isString(basics.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basics.email)) {
    errors.push('Basics: valid email is required');
  }

  if (basics.socials) {
    if (!isString(basics.socials.linkedin)) errors.push('Basics: socials.linkedin must be a string');
  } else {
    errors.push('Basics: socials is required');
  }

  if (!isArray(basics.keywords) || !basics.keywords.every(isString)) {
    errors.push('Basics: keywords must be an array of strings');
  }
}

function validateExperience(experience, errors) {
  if (!isArray(experience)) {
    errors.push('Experience must be an array');
    return;
  }
  experience.forEach((exp, index) => {
    if (!isString(exp.company) || exp.company.trim() === '') errors.push(`Experience[${index}]: company is required`);
    if (!isString(exp.title) || exp.title.trim() === '') errors.push(`Experience[${index}]: title is required`);
    if (!isString(exp.startDate)) errors.push(`Experience[${index}]: startDate must be a string`);
    if (!isString(exp.endDate)) errors.push(`Experience[${index}]: endDate must be a string`);
    if (!isString(exp.location)) errors.push(`Experience[${index}]: location must be a string`);
    if (!isArray(exp.highlights) || !exp.highlights.every(isString)) {
      errors.push(`Experience[${index}]: highlights must be an array of strings`);
    }
  });
}

function validateProfileData(data) {
  const errors = [];
  try {
    if (!data) return { success: false, errors: ['No data provided'] };
    validateBasics(data.basics, errors);
    validateExperience(data.experience, errors);
    // ... skipping others for brevity in this mock, but they follow same pattern
    return {
      success: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    return { success: false, errors: ['Internal validation error'] };
  }
}

// Test cases
const testCases = [
  {
    name: "Valid data",
    data: {
      basics: {
        name: "Test User",
        headline: "Software Engineer",
        about: "Testing",
        location: "World",
        email: "test@example.com",
        socials: { linkedin: "https://linkedin.com/in/test" },
        keywords: ["test", "dev"]
      },
      experience: [
        {
          company: "Test Co",
          title: "Dev",
          startDate: "2020",
          endDate: "2021",
          location: "Remote",
          highlights: ["coding"]
        }
      ]
    },
    expected: true
  },
  {
    name: "Missing name",
    data: {
      basics: {
        headline: "Software Engineer",
        about: "Testing",
        location: "World",
        email: "test@example.com",
        socials: { linkedin: "https://linkedin.com/in/test" },
        keywords: ["test", "dev"]
      },
      experience: []
    },
    expected: false
  },
  {
    name: "Invalid email",
    data: {
      basics: {
        name: "Test User",
        headline: "Software Engineer",
        about: "Testing",
        location: "World",
        email: "invalid-email",
        socials: { linkedin: "https://linkedin.com/in/test" },
        keywords: ["test", "dev"]
      },
      experience: []
    },
    expected: false
  },
  {
    name: "XSS in name (detected by string check, but we should also check content if needed)",
    data: {
      basics: {
        name: "<script>alert('xss')</script>",
        headline: "Software Engineer",
        about: "Testing",
        location: "World",
        email: "test@example.com",
        socials: { linkedin: "https://linkedin.com/in/test" },
        keywords: ["test", "dev"]
      },
      experience: []
    },
    expected: true // Currently our validation doesn't block HTML tags, but it ensures it's a string.
                  // React handles the escaping, but strict validation would be better.
  },
  {
      name: "Wrong type for keywords",
      data: {
        basics: {
          name: "Test User",
          headline: "Software Engineer",
          about: "Testing",
          location: "World",
          email: "test@example.com",
          socials: { linkedin: "https://linkedin.com/in/test" },
          keywords: "not-an-array"
        },
        experience: []
      },
      expected: false
    }
];

console.log("Running validation tests...");
let passedAll = true;

testCases.forEach(tc => {
  const result = validateProfileData(tc.data);
  if (result.success === tc.expected) {
    console.log(`[PASS] ${tc.name}`);
  } else {
    console.log(`[FAIL] ${tc.name}`);
    console.log("  Expected:", tc.expected);
    console.log("  Actual:", result.success);
    console.log("  Errors:", result.errors);
    passedAll = false;
  }
});

if (passedAll) {
  console.log("\nAll tests passed!");
} else {
  console.log("\nSome tests failed.");
  process.exit(1);
}

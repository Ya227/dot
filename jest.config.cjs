module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/unit/**/*.test.ts", "<rootDir>/tests/unit/**/*.test.tsx"],
  transform: { "^.+\\.[jt]sx?$": "babel-jest" },
  collectCoverageFrom: ["src/features/navbarNavigation.ts"],
  coverageReporters: ["html", "lcov", "text"],
};

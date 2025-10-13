module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/app/**/*.ts"],

  transform: {
    "^.+\\.(ts|mjs|html|js)$": "ts-jest",
  },
};



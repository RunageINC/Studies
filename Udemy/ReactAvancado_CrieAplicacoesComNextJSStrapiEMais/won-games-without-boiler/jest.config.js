module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/cypress/",
    "/.next/",
    "/src/app/components/@shared/svgs/",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts(x)",
    "!src/app/layout.tsx",
    "!src/app/page.tsx",
    "!src/app/components/@shared/svgs/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
  modulePaths: ["<rootDir>/src/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
};

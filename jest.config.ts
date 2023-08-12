import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.(ts|tsx)"],
};

export default config;

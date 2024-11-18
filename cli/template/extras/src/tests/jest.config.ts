const nextJest = require("next/jest");
import type { Config } from 'jest'

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {

  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
const config: Config = {
   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
}



export default createJestConfig(config);

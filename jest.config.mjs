/**
 * @type {import('@jest/types').Config.InitialOptions}
 */

const config = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  verbose: true,
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/dist/$1"
  }
}
export default config

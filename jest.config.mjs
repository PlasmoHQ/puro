/**
 * @type {import('@jest/types').Config.InitialOptions}
 */

const config = {
  clearMocks: true,
  moduleFileExtensions: ["js", "tsx"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", { isolatedModules: true, useESM: true }]
  },
  verbose: true,
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1"
  }
}
export default config

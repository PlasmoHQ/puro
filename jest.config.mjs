/**
 * @type {import('@jest/types').Config.InitialOptions}
 */

const config = {
  clearMocks: true,
  moduleFileExtensions: ["js", "tsx"],
  globals: {
    "ts-jest": {
      useESM: true
    }
  },
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", { isolatedModules: true, useESM: true }]
  },
  verbose: true,
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/dist/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1"
  }
}
export default config

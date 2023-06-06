/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/test"],
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: 'test/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
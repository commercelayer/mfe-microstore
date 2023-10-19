module.exports = {
  roots: ["<rootDir>/components"],
  transform: {
    "^.+\\.ts(x)?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true, // skipping type-checking so we spead-up CI. Type-checking will be done during building step
    },
  },
  testEnvironment: "jsdom",
  maxWorkers: 1, // works better for CI
  testRegex: "(.*|(\\.|/))\\.(test|spec).ts(x)?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
}

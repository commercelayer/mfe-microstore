import { BLACK_COLOR, hexToHSL } from "./hex2hsl"

describe("HEX to HSL", () => {
  test("Regular hex code", () => {
    expect(hexToHSL("#ff0000")).toEqual({
      h: 0,
      l: "50.00%",
      s: "100.00%",
    })
  })

  test("Hex that generates floating hue", () => {
    expect(hexToHSL("#ff2a00")).toEqual({
      h: 9.882352941176471,
      l: "50.00%",
      s: "100.00%",
    })
  })

  test("With short hex (3 chars)", () => {
    expect(hexToHSL("#ff0")).toEqual({
      h: 60,
      l: "50.00%",
      s: "100.00%",
    })
  })

  test("With invalid 4 chars hex", () => {
    expect(hexToHSL("#ff00")).toBe(undefined)
  })

  test("With invalid 5 chars hex", () => {
    expect(hexToHSL("#ff001")).toBe(undefined)
  })

  test("With no hash", () => {
    expect(hexToHSL("ff0")).toEqual({
      h: 60,
      l: "50.00%",
      s: "100.00%",
    })
  })

  test("With only hash", () => {
    expect(hexToHSL("######")).toBe(undefined)
  })

  test("With double hash", () => {
    expect(hexToHSL("##ff0")).toEqual({
      h: 60,
      l: "50.00%",
      s: "100.00%",
    })
  })

  test("With spaces", () => {
    expect(hexToHSL(" ##ff0   ")).toEqual({
      h: 60,
      l: "50.00%",
      s: "100.00%",
    })
  })

  test("Empty", () => {
    expect(hexToHSL("")).toBe(undefined)
  })
  test("Empty with spaces", () => {
    expect(hexToHSL("   ")).toBe(undefined)
  })

  test("Broken or invalid hex", () => {
    expect(hexToHSL(" asdasdsasa  ")).toBe(undefined)
  })

  test("Hex with more then 6 chars", () => {
    expect(hexToHSL("#ff2a00222222")).toBe(undefined)
    expect(hexToHSL("ff2a00222222")).toBe(undefined)
  })
})

test("Black color", () => {
  expect(BLACK_COLOR).toEqual({ h: 0, l: "0%", s: "0%" })
})

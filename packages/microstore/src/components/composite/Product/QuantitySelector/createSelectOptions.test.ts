import { createSelectOptions } from "./createSelectOptions"

describe("Create quantity selector options based on max available quantity", () => {
  test("available is less than max default", () => {
    expect(createSelectOptions(6)).toStrictEqual([1, 2, 3, 4, 5, 6])
  })

  test("availability is greater than max default", () => {
    expect(createSelectOptions(40)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ])
  })

  test("availability is equal to max default", () => {
    expect(createSelectOptions(10)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ])
  })

  test("availability is 0", () => {
    expect(createSelectOptions(0)).toStrictEqual([])
  })
})

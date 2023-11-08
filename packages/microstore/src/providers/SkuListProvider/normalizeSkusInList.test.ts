import { SkuList } from "@commercelayer/sdk"

import { normalizeSkusInList } from "./normalizeSkusInList"

const skuListWithRegex = {
  id: "xxxxxxxxxx",
  type: "sku_lists",
  manual: false,
  sku_code_regex: "^(T).*$",
  skus: [
    {
      id: "ZbpjSNaemq",
      type: "skus",
      code: "TSHIRTWV000000FFFFFFSXXX",
      name: "Black Women V-Neck T-Shirt with White Logo (S)",
      description:
        "This wonderful women's V-neck fits in anywhere — be it a casual morning stroll or the summer's hippest festival. It's made from 100% cotton and has a semi-fitted contoured silhouette.",
      image_url:
        "https://data.commercelayer.app/seed/images/skus/TSHIRTWV000000FFFFFFSXXX_FLAT.png",
      reference: "sku_246",
      metadata: {},
    },
    {
      id: "nvAJSyvDqD",
      type: "skus",
      code: "TSHIRTWKFFFFFF000000MXXX",
      name: "White Women Cropped T-Shirt with Black Logo (M)",
      description:
        "The season's trendiest garment — the crop top. This top is tight-fitting and hits just above the navel. 52/48 combed and ringspun cotton/polyester. Form fitting. Side seamed.",
      image_url:
        "https://data.commercelayer.app/seed/images/skus/TSHIRTWKFFFFFF000000MXXX_FLAT.png",
      reference: "sku_230",
      metadata: {},
    },
  ],
  sku_list_items: [],
} as unknown as SkuList

const skuListWithManual = {
  id: "zzzzzzzzzz",
  type: "sku_lists",
  manual: true,
  sku_code_regex: null,
  skus: [
    {
      code: "TSHIRTMS000000FFFFFFLXXX",
    },
    { code: "TSHIRTMM000000FFFFFFXLXX" },
    { code: "TSHIRTMM000000FFFFF222" },
  ],
  sku_list_items: [
    {
      id: "rzDpOINGZz",
      type: "sku_list_items",
      sku_code: "TSHIRTMS000000FFFFFFLXXX",
      quantity: 2,
    },
    {
      id: "MgMRPIKVqW",
      type: "sku_list_items",
      sku_code: "TSHIRTMM000000FFFFFFXLXX",
      quantity: 1,
    },
    {
      id: "yWEpMImZRg",
      type: "sku_list_items",
      sku_code: "TSHIRTMM000000FFFFF222",
      quantity: 5,
    },
  ],
} as unknown as SkuList

describe("normalizeSkusInList", () => {
  test("should return a simple array of type SkuWithQuantity when manual is false", () => {
    const skus = normalizeSkusInList(skuListWithRegex)
    expect(skus).toStrictEqual([
      {
        sku: {
          id: "ZbpjSNaemq",
          type: "skus",
          code: "TSHIRTWV000000FFFFFFSXXX",
          name: "Black Women V-Neck T-Shirt with White Logo (S)",
          description:
            "This wonderful women's V-neck fits in anywhere — be it a casual morning stroll or the summer's hippest festival. It's made from 100% cotton and has a semi-fitted contoured silhouette.",
          image_url:
            "https://data.commercelayer.app/seed/images/skus/TSHIRTWV000000FFFFFFSXXX_FLAT.png",
          reference: "sku_246",
          metadata: {},
        },
        quantity: 1,
      },
      {
        sku: {
          id: "nvAJSyvDqD",
          type: "skus",
          code: "TSHIRTWKFFFFFF000000MXXX",
          name: "White Women Cropped T-Shirt with Black Logo (M)",
          description:
            "The season's trendiest garment — the crop top. This top is tight-fitting and hits just above the navel. 52/48 combed and ringspun cotton/polyester. Form fitting. Side seamed.",
          image_url:
            "https://data.commercelayer.app/seed/images/skus/TSHIRTWKFFFFFF000000MXXX_FLAT.png",
          reference: "sku_230",
          metadata: {},
        },
        quantity: 1,
      },
    ])
  })

  test("should return a simple array of type SkuWithQuantity when manual is true", () => {
    const skus = normalizeSkusInList(skuListWithManual)

    expect(skus).toStrictEqual([
      {
        sku: { code: "TSHIRTMS000000FFFFFFLXXX" },
        quantity: 2,
      },
      {
        sku: { code: "TSHIRTMM000000FFFFFFXLXX" },
        quantity: 1,
      },
      {
        sku: { code: "TSHIRTMM000000FFFFF222" },
        quantity: 5,
      },
    ])
  })
})

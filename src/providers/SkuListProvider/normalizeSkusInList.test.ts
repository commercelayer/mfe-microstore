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
      pieces_per_pack: null,
      weight: null,
      unit_of_weight: null,
      hs_tariff_number: null,
      do_not_ship: false,
      do_not_track: false,
      inventory: {
        available: true,
        quantity: 512,
        levels: [
          {
            quantity: 421,
            delivery_lead_times: [],
          },
          {
            quantity: 91,
            delivery_lead_times: [],
          },
        ],
      },
      created_at: "2022-06-15T14:57:06.943Z",
      updated_at: "2022-06-15T14:57:06.943Z",
      reference: "sku_246",
      reference_origin: "CLI",
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
      weight: null,
      unit_of_weight: null,
      hs_tariff_number: null,
      do_not_ship: false,
      do_not_track: false,
      inventory: {
        available: true,
        quantity: 1563,
        levels: [
          {
            quantity: 853,
            delivery_lead_times: [],
          },
          {
            quantity: 710,
            delivery_lead_times: [],
          },
        ],
      },
      created_at: "2022-06-15T14:57:06.192Z",
      updated_at: "2022-06-15T14:57:06.192Z",
      reference: "sku_230",
      reference_origin: "CLI",
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
  skus: [],
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
        skuCode: "TSHIRTWV000000FFFFFFSXXX",
        quantity: 1,
      },
      {
        skuCode: "TSHIRTWKFFFFFF000000MXXX",
        quantity: 1,
      },
    ])
  })

  test("should return a simple array of type SkuWithQuantity when manual is true", () => {
    const skus = normalizeSkusInList(skuListWithManual)

    expect(skus).toStrictEqual([
      {
        skuCode: "TSHIRTMS000000FFFFFFLXXX",
        quantity: 2,
      },
      {
        skuCode: "TSHIRTMM000000FFFFFFXLXX",
        quantity: 1,
      },
      {
        skuCode: "TSHIRTMM000000FFFFF222",
        quantity: 5,
      },
    ])
  })
})

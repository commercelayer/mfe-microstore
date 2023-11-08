import { lineItemName } from "./lineItemName"

describe("SKU name with no translations", () => {
  const sku = {
    name: "Baseball Hat",
    code: "BASEBALL",
  }
  test("Default line item name", () => {
    const name = lineItemName(sku, "en")
    expect(name).toBe("Baseball Hat")
  })

  test("Default line item name with different language", () => {
    const name = lineItemName(sku, "it")
    expect(name).toBe("Baseball Hat")
  })

  test("Default line item name with unknown language", () => {
    const name = lineItemName(sku, "kk")
    expect(name).toBe("Baseball Hat")
  })

  test("with metadata not translated", () => {
    const name = lineItemName({ ...sku, metadata: { name: "My SKU" } }, "en")
    expect(name).toBe("Baseball Hat")
  })

  test("with empty metadata", () => {
    const name = lineItemName({ ...sku, metadata: {} }, "en")
    expect(name).toBe("Baseball Hat")
  })
})

describe("Product name with proper translations", () => {
  const sku = {
    name: "Baseball Hat",
    code: "BASEBALL",
    metadata: {
      microstore_i18n_en_name: "White",
      microstore_i18n_it_name: "Bianco",
      microstore_i18n_en_description:
        "Step up your accessory game with a new washed twill dad cap. Pair our embroidery logo design with a sporty feel and create a unique premium baseball hat that's bound to become a favorite.",
      microstore_i18n_it_description:
        "Porta il livello del tuo gioco al massimo con questo stupendo cappello. Accoppialo al logo bianco per le migliori performance",
      microstore_i18n_en_reference_name: "Baseball Hat with Logo",
      microstore_i18n_it_reference_name: "Cappello da Baseball con Logo",
    },
  }
  test("Line item name", () => {
    const name = lineItemName(sku, "en")
    expect(name).toBe("Baseball Hat with Logo - White")
  })

  test("Line item name with different language", () => {
    const name = lineItemName(sku, "it")
    expect(name).toBe("Cappello da Baseball con Logo - Bianco")
  })

  test("Line item name with unknown language", () => {
    const name = lineItemName(sku, "kk")
    expect(name).toBe("Baseball Hat with Logo - White")
  })
})

describe("Product name with missing a few translations", () => {
  const sku = {
    name: "Baseball Hat",
    code: "BASEBALL",
    metadata: {
      microstore_i18n_en_name: "White",
      microstore_i18n_it_name: "Bianco",
      microstore_i18n_en_reference_name: "Baseball Hat with Logo",
    },
  }
  test("Line item name", () => {
    const name = lineItemName(sku, "en")
    expect(name).toBe("Baseball Hat with Logo - White")
  })

  test("Line item name with different language", () => {
    const name = lineItemName(sku, "it")
    expect(name).toBe("Baseball Hat with Logo - Bianco")
  })

  test("Line item name with unknown language", () => {
    const name = lineItemName(sku, "kk")
    expect(name).toBe("Baseball Hat with Logo - White")
  })
})

describe("SKU name with translations", () => {
  const sku = {
    name: "Baseball Hat",
    code: "BASEBALL",
    metadata: {
      microstore_i18n_en_name: "Baseball Hat with Logo",
      microstore_i18n_it_name: "Cappello da baseball con logo",
    },
  }
  test("Line item name", () => {
    const name = lineItemName(sku, "en")
    expect(name).toBe("Baseball Hat with Logo")
  })

  test("Line item name with different language", () => {
    const name = lineItemName(sku, "it")
    expect(name).toBe("Cappello da baseball con logo")
  })

  test("Line item name with unknown language", () => {
    const name = lineItemName(sku, "kk")
    expect(name).toBe("Baseball Hat with Logo")
  })
})

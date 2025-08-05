import { HostedCart } from "@commercelayer/react-components/orders/HostedCart"
import type { SkuWithQuantity } from "@typings/urlData"
import { Hero } from "#components/composite/Hero"
import { Product } from "#components/composite/Product"
import type { SimpleSkuList } from "#providers/SkuListProvider"
import { withVariants } from "#providers/SkuListProvider/withVariants"
import { openMiniCart } from "#utils/openMiniCart"
import { ButtonBuyAll } from "../ButtonBuyAll"
import { Wrapper } from "./styled"

interface Props {
  skus?: SkuWithQuantity[]
  skuList?: SimpleSkuList
  couponCode?: string
}

export const Microstore = ({ skus = [], skuList, couponCode }: Props) => {
  if (skus.length === 0) {
    return (
      <div className="py-10 font-bold" data-test-id="no-skus-found">
        We could not find any products to display. Please check your URL and try
        again.
      </div>
    )
  }

  let products: Record<string, SkuWithQuantity[]> = {}
  if (withVariants(skus)) {
    const productsWithVariants = skus.reduce((r, a) => {
      const k = a.sku.reference ?? "noReference"
      r[k] = r[k] || []
      r[k].push(a)
      return r
    }, Object.create(null))
    products = productsWithVariants
  }

  return (
    <>
      <HostedCart
        type="mini"
        openAdd={openMiniCart()}
        style={{
          container: {
            backgroundColor: "white",
            zIndex: "20",
            maxWidth: "100vw",
          },
          background: {
            zIndex: "15",
          },
        }}
      />
      <Hero skuList={skuList} couponCode={couponCode} />
      <ButtonBuyAll />

      <Wrapper>
        {Object.keys(products).length === 0
          ? skus.map((item) => <Product key={item.sku.code} skus={[item]} />)
          : Object.keys(products).map((key) => (
              <Product key={key} skus={products[key]} />
            ))}
      </Wrapper>
    </>
  )
}

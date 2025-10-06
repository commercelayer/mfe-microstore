import { HostedCart } from "@commercelayer/react-components/orders/HostedCart"
import type { SkuWithQuantity } from "@typings/urlData"
import { Hero } from "#components/composite/Hero"
import { Product } from "#components/composite/Product"
import type { SimpleSkuList } from "#providers/SkuListProvider"
import {
  groupedSkus,
  withVariants,
} from "#providers/SkuListProvider/withVariants"
import { openMiniCart } from "#utils/openMiniCart"
import { ButtonBuyAll } from "../ButtonBuyAll"

interface Props {
  skus?: SkuWithQuantity[]
  skuList?: SimpleSkuList
  couponCode?: string
}

const MAX_SKUS_FOR_BUY_ALL = 25

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
    const productsWithVariants = groupedSkus(skus)
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
      {skus.length <= MAX_SKUS_FOR_BUY_ALL && <ButtonBuyAll />}
      <div className="flex flex-col [&>hr:last-child]:hidden">
        {Object.keys(products).length === 0
          ? skus.map((item) => <Product key={item.sku.code} skus={[item]} />)
          : Object.keys(products).map((key) => (
              <Product key={key} skus={products[key]} />
            ))}
      </div>
    </>
  )
}

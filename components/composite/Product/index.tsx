import {
  SkuField,
  AvailabilityContainer,
  ItemContainer,
  PricesContainer,
  Price,
  AvailabilityTemplate,
} from "@commercelayer/react-components"

import { DiscountBadge } from "./DiscountBadge"
import {
  Card,
  CardFooter,
  Divider,
  SKU,
  StyledAddToCartButton,
  Thumb,
} from "./styled"

export const Product = () => {
  return (
    <Card>
      <Thumb attribute="image_url" tagElement="img" />
      <h4 className="text-xs font-bold text-gray-400">
        <SKU attribute="code" tagElement="p" />
      </h4>
      <h3 className="text-xl">
        <SkuField attribute="name" tagElement="p" />
      </h3>
      <AvailabilityContainer>
        <AvailabilityTemplate>
          {({ quantity, text }) => {
            return (
              <div className="my-3 text-sm font-bold text-green-400">
                <span className="w-4 h-4 bg-green-400" />
                {text}
              </div>
            )
          }}
        </AvailabilityTemplate>
      </AvailabilityContainer>
      <Divider />
      <div className="text-sm">
        <SkuField attribute="description" tagElement="p" />
      </div>
      <CardFooter>
        <ItemContainer>
          <div className="flex flex-row-reverse items-center m-2">
            <PricesContainer loader={<p>loading</p>}>
              <Price
                className="m-1 text-xl font-bold"
                compareClassName="text-gray-400 m-1 line-through "
              />
              <DiscountBadge />
            </PricesContainer>
          </div>
          <StyledAddToCartButton buyNowMode label="Buy Now" />
        </ItemContainer>
      </CardFooter>
    </Card>
  )
}

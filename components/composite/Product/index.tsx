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
  CardBody,
  CardDesc,
  CardFooter,
  CardImage,
  CardPrice,
  CardStock,
  CardTitle,
  Divider,
  StyledAddToCartButton,
  Thumb,
} from "./styled"

export const Product = () => {
  return (
    <Card>
      <CardImage>
        <Thumb attribute="image_url" tagElement="img" />
        <PricesContainer>
          <DiscountBadge />
        </PricesContainer>
      </CardImage>
      <CardBody>
        <CardTitle>
          <SkuField attribute="name" tagElement="p" />
        </CardTitle>
        <Divider />
        <CardDesc>
          <SkuField attribute="description" tagElement="p" />
        </CardDesc>
        <CardFooter>
          <ItemContainer>
            <CardPrice>
              <div className="flex flex-row-reverse items-center">
                <PricesContainer loader={<p>loading</p>}>
                  <Price
                    className="text-xl font-bold"
                    compareClassName="text-gray-400 line-through mr-2"
                  />
                </PricesContainer>
              </div>
              <StyledAddToCartButton buyNowMode label="Buy Now" />
            </CardPrice>
          </ItemContainer>
          <AvailabilityContainer>
            <AvailabilityTemplate>
              {({ quantity, text }) => {
                return (
                  <CardStock>
                    <span className="block w-2 h-2 bg-green-400 rounded-full" />
                    {text}
                  </CardStock>
                )
              }}
            </AvailabilityTemplate>
          </AvailabilityContainer>
        </CardFooter>
      </CardBody>
    </Card>
  )
}

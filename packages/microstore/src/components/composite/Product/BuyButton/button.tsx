import { AddToCartButton as AddToCartButtonComponent } from "@commercelayer/react-components/orders/AddToCartButton"
import type { ComponentProps, FC } from "react"

import { buttonClasses } from "#components/ui/Button"

export const StyledAddToCartButton: FC<
  ComponentProps<typeof AddToCartButtonComponent> & { className?: string }
> = ({ className = "", ...props }) => (
  <AddToCartButtonComponent
    className={`${buttonClasses} ${className}`}
    {...props}
  />
)

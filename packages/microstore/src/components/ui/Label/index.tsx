import type { FC, LabelHTMLAttributes } from "react"

export const labelClasses = "inline text-xs font-extrabold sm:hidden"

export const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
  className = "",
  htmlFor,
  children,
}) => (
  <label className={`${labelClasses} ${className}`} htmlFor={htmlFor}>
    {children}
  </label>
)

import type { ButtonHTMLAttributes, FC } from "react"

export const buttonClasses =
  "inline-flex items-center justify-center w-full p-3 text-xs font-extrabold text-contrast bg-primary border border-primary rounded-md transition duration-300 ease-in hover:opacity-80 disabled:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 md:w-48 cursor-pointer disabled:cursor-default"

export const ButtonWrapper: FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = "" }) => (
  <div className={`flex justify-end ${className}`}>{children}</div>
)

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <button className={`${buttonClasses} ${className}`} {...props}>
    {children}
  </button>
)

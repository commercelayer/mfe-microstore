import { SelectHTMLAttributes } from "react"
import styled from "styled-components"
import tw from "twin.macro"

type Props = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ children, ...rest }: Props): JSX.Element {
  return (
    <div className="relative">
      <Wrapper>
        <StyledSelect {...rest}>{children}</StyledSelect>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  min-width: 70px;
  ${tw`relative inline-block w-full`}
`

const StyledSelect = styled.select`
  ${tw`
    appearance-none outline-none w-full bg-white px-4 py-3 pr-7 
    border border-gray-300 rounded 
    text-black text-xs 
    transition duration-500 ease-in-out
    focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary-light focus:ring-opacity-50
  `}
`

import { Logo } from "./cl"

export function Footer(): JSX.Element {
  return (
    <div className="md:flex w-full bottom-0 justify-start items-center border-t border-gray-200 p-8 text-xs text-gray-400 lg:p-0 lg:py-8 lg:mt-4">
      <a target="_blank" href="https://commercelayer.io/" rel="noreferrer">
        <div className="flex items-center">
          Powered by <Logo width="135" height="22" className="pl-2" />
        </div>
      </a>
    </div>
  )
}

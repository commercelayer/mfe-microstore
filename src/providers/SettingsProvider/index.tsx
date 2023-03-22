import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { getAccessTokenFromUrl } from "#utils/getAccessTokenFromUrl"
import { defaultSettings, getSettings } from "#utils/getSettings"

type SettingsProviderValue = {
  /**
   * Can contains either a valid `Settings` or `InvalidSettings` object.
   * Invalid settings will be returned when part of initial API data fetching fails
   * and it's not possible to show a full app page.
   */
  settings: Settings | InvalidSettings
  /**
   * When `true` it means that app is fetching content from API and is not ready to return the `Settings` object.
   * It can be used to control the UI state.
   */
  isLoading: boolean
}

type SettingsProviderProps = {
  /**
   * If needed, context value can be also accessed using a function as a child.
   *
   * Example:
   * ```
   * <SettingsProvider >
   *  {(ctx) => <div>app</div>}
   * </SettingsProvider>
   * ```
   */
  children: ((props: SettingsProviderValue) => ReactNode) | ReactNode
  /**
   * App config served locally from public/config.json
   */
  config: CommerceLayerAppConfig
}

const initialValues: SettingsProviderValue = {
  settings: defaultSettings,
  isLoading: true,
}

export const SettingsContext =
  createContext<SettingsProviderValue>(initialValues)

export const useSettings = (): SettingsProviderValue => {
  const ctx = useContext(SettingsContext)
  return {
    settings: ctx.settings,
    isLoading: !!ctx.isLoading,
  }
}

export const SettingsProvider: FC<SettingsProviderProps> = ({
  children,
  config,
}) => {
  const [settings, setSettings] = useState<Settings | InvalidSettings>(
    defaultSettings
  )
  const [isLoading, setIsLoading] = useState(true)
  const accessToken = getAccessTokenFromUrl()

  useEffect(() => {
    setIsLoading(!!accessToken)

    if (accessToken) {
      getSettings({
        accessToken,
        config,
      })
        .then(setSettings)
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [accessToken])

  const value = { settings, isLoading }
  return (
    <SettingsContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </SettingsContext.Provider>
  )
}

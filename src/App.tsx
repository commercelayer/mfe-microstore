import { HelmetProvider } from "react-helmet-async"
import { Router, Route, Switch } from "wouter"

import ErrorPage from "#pages/ErrorPage"
import SkuListPage from "#pages/SkuListPage"
import { SettingsProvider } from "#providers/SettingsProvider"

function App(): JSX.Element {
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  const config = {
    ...window.clAppConfig,
    selfHostedSlug:
      // local config is always overwritten by ENV var, if present
      import.meta.env.PUBLIC_SELF_HOSTED_SLUG ??
      window.clAppConfig.selfHostedSlug,
  }

  return (
    <HelmetProvider>
      <Router base={basePath}>
        <Switch>
          <Route path={"/404"}>
            <ErrorPage />
          </Route>
          <Route path={"/list/:skuListId"}>
            <SettingsProvider config={config}>
              <SkuListPage />
            </SettingsProvider>
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </HelmetProvider>
  )
}

export default App

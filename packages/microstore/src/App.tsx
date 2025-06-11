import { HelmetProvider } from "react-helmet-async"
import { Route, Router, Switch } from "wouter"

import ErrorPage from "#pages/ErrorPage"
import SkuListPage from "#pages/SkuListPage"
import SkuPage from "#pages/SkuPage"
import { SettingsProvider } from "#providers/SettingsProvider"

function App() {
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
          <Route path={"/sku/:skuId"}>
            <SettingsProvider config={config}>
              <SkuPage />
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

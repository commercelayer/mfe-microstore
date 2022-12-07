import { HelmetProvider } from "react-helmet-async"
import { Router, Route, Switch } from "wouter"

import ErrorPage from "#pages/ErrorPage"
import SkuListPage from "#pages/SkuListPage"
import { RuntimeConfigProvider } from "#providers/RuntimeConfigProvider"
import { SettingsProvider } from "#providers/SettingsProvider"

function App(): JSX.Element {
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  return (
    <HelmetProvider>
      <RuntimeConfigProvider>
        {(config) => (
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
        )}
      </RuntimeConfigProvider>
    </HelmetProvider>
  )
}

export default App

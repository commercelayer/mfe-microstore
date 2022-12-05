import { HelmetProvider } from "react-helmet-async"
import { Router, Route, Switch } from "wouter"

import ErrorPage from "#pages/ErrorPage"
import SkuListPage from "#pages/SkuListPage"
import { SettingsProvider } from "#providers/SettingsProvider"

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Router base={import.meta.env.PUBLIC_BASE_PATH}>
        <Switch>
          <Route path={"/404"}>
            <ErrorPage />
          </Route>
          <Route path={"/list/:skuListId"}>
            <SettingsProvider>
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

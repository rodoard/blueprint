import { V2_MetaFunction, useLocation } from "@remix-run/react";
import { Links, LiveReload, Meta, Outlet, Scripts, useRouteError } from "@remix-run/react";
import ErrorPage from "./error-page";
import styles from './styles/app.css';
import { useState } from "react";
import type { ScreenerState } from "./states/screener";
import { getScreenerInitialState } from "./states/screener";
import { Header } from "./components/Header";

export const meta: V2_MetaFunction = () => {
  return [{ title: "TakeHome: Blueprint Diagnostic Screener Exercise" }];
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
const HOME_URL = "/"
export default function App() {
  const [state, updateState] = useState<ScreenerState>(getScreenerInitialState());
  const location = useLocation()
  const isHome = location.pathname === HOME_URL
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {!isHome && <Header />}
        <Outlet context={{ state, updateState }} />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return <ErrorPage error={error} />;
}
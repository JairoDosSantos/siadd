import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../../styles/globals.css';

import { wrapper } from "../store/store";

import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache, pageProps } = props;
  const queryClient = new QueryClient()
  /* ... */
  useEffect(() => {

    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  /* ... */

  return (
    // forcedTheme={Component.theme || null} ThemeProviderProps
    <ThemeProvider enableSystem={true} attribute="class">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}


export default MyApp;
//export default wrapper.withRedux(MyApp);
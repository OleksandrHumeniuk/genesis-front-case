import type { AppProps } from 'next/app';

import '@/styles/globals.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthService from '@/services/auth.service';
import React, { useCallback, useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

import theme from '@/styles/theme';
import { wrapper } from '@/redux';
import Toast from '@/components/common/toast';
import Head from 'next/head';

const queryClient = new QueryClient();
const App = ({ Component, pageProps }: AppProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadToken = useCallback(async () => {
    await AuthService.getToken();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    void loadToken();
  }, [loadToken]);

  return (
    isLoaded && (
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Learnify</title>
        </Head>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toast />
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </QueryClientProvider>
    )
  );
};

export default wrapper.withRedux(App);

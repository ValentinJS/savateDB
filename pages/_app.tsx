import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AppContainer } from '../components/AppContainer';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Awesome DB</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
        }}>
        <NotificationsProvider>
          <ModalsProvider>
            <AppContainer>
              <Component {...pageProps} />
            </AppContainer>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

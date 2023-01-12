import { AppShell, Header } from '@mantine/core';

export const AppContainer = ({ children }: any) => {
  return (
    <AppShell
      styles={{
        main: {
          minHeight: '100vh',
        },
      }}
      fixed
      header={
        <Header height="70" p="md">
          Awesome DB
        </Header>
      }>
      {children}
    </AppShell>
  );
};

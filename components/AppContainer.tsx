import { AppShell, Header } from '@mantine/core';

export const AppContainer = ({ children }: any) => {
  return (
    <AppShell
      styles={{
        main: {
          width: '100vw',
          height: '100vh',
          paddingLeft: '0px',
        },
      }}
      fixed
      header={
        <Header height={60} p="md">
          Awesome DB
        </Header>
      }>
      {children}
    </AppShell>
  );
};

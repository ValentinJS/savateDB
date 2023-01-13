import { AppShell, Container, Group, Header, Text } from '@mantine/core';
import { SearchInput } from './Search';

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
        <Header height={{ base: 110, sm: 70 }} p="md">
          <Container px={20} size="lg">
            <Group position="apart">
              <Text size="md">Awesome DB</Text>
              <SearchInput />
            </Group>
          </Container>
        </Header>
      }>
      {children}
    </AppShell>
  );
};

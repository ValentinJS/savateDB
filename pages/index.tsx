import { Center, Group, Header, SimpleGrid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { BadgeCard } from '../components/Card';
import { SearchInput } from '../components/Search';
import { ICover, IGame } from '../types';

export default function App() {
  const [search, setSearch] = useState('');
  const [games, setGames] = useState<IGame[]>();
  const [images, setImages] = useState<ICover[]>();

  useEffect(() => {
    fetch('api/games', {
      body: JSON.stringify({ query: search ? `search "${search}";` : '' }),
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games);
        setImages(data.covers);
      });
  }, [search]);

  const onSearch = (value: string) => {
    if (value.length > 4) {
      setSearch(value);
    }
  };

  return (
    <>
      <Header height={70} p="md">
        <Group sx={{ height: '100%' }} px={20} position="apart">
          <Text size="sm">Awesome DB</Text>
          <SearchInput onChange={onSearch} />
        </Group>
      </Header>

      <Center sx={{ height: '100%' }}>
        <SimpleGrid cols={5} breakpoints={[{ maxWidth: 'xl', cols: 1 }]}>
          {!games
            ? 'Loading...'
            : games.map((game) => (
                <BadgeCard
                  key={game.id}
                  image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                    images?.find((i) => i.game === game.id)?.image_id
                  }.jpg`}
                  title={game.name}
                  description={game.summary}
                />
              ))}
        </SimpleGrid>
      </Center>
    </>
  );
}

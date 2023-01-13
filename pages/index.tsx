import { Center, SimpleGrid } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { ImageCard } from '../components/ImageCard';
import { useLoadingContext } from '../context/loading';
import { useSearchContext } from '../context/search';
import { fetchGames } from '../lib/api';
import { ICover, IGame } from '../types';

export default function App() {
  const [games, setGames] = useState<IGame[]>();
  const [images, setImages] = useState<ICover[]>();

  const { search, setSearch } = useSearchContext();
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    setLoading(search !== undefined);

    fetchGames(search)
      .then(({ games, covers }) => {
        setGames(games);
        setImages(covers);
      })
      .catch((error) => {
        showNotification({ title: 'Error', message: error.message, color: 'red' });
      })
      .finally(() => setLoading(false));
  }, [search, setSearch, setLoading]);

  return (
    <Center sx={{ height: '100%' }}>
      <SimpleGrid cols={5} breakpoints={[{ maxWidth: 'xl', cols: 1 }]}>
        {!games && 'Loading...'}
        {games?.length === 0 && 'No games match your request'}
        {games?.map((game) => (
          <ImageCard
            key={game.id}
            image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
              images?.find((i) => i.game === game.id)?.image_id
            }.jpg`}
            title={game.name}
            description={game.summary}
            game={game}
          />
        ))}
      </SimpleGrid>
    </Center>
  );
}

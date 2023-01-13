import { Loader, TextInput } from '@mantine/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { useLoadingContext } from '../context/loading';
import { SearchTerm, useSearchContext } from '../context/search';
import useDebounce from '../hooks/debounce';

export function SearchInput() {
  const { search, setSearch } = useSearchContext();
  const { loading } = useLoadingContext();
  const [searchTerm, setSearchTerm] = useState<SearchTerm>(search);

  const debouncedSearchTerm = useDebounce<SearchTerm>(searchTerm, 500);

  useEffect(() => {
    setSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearch]);

  return (
    <TextInput
      aria-label="Search games"
      onChange={(ev: ChangeEvent<HTMLInputElement>) => setSearchTerm(ev.target.value)}
      error={searchTerm?.length && searchTerm.length < 4 ? 'At least 4 chars' : ''}
      placeholder="Search for a game..."
      rightSection={<Loader size="xs" visibility={loading ? 'visible' : 'hidden'} />}
      width="500px"
    />
  );
}

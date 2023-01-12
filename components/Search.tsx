import { Loader, TextInput } from '@mantine/core';
import { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '../hooks/debounce';

interface IProps {
  onChange: (v?: string) => void;
  loading?: boolean;
}

export function SearchInput({ onChange, loading }: IProps) {
  const [searchTerm, setSearchTerm] = useState<string>();

  const debouncedSearchTerm = useDebounce<string | undefined>(searchTerm, 500);

  useEffect(() => {
    onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onChange]);

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

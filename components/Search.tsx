import { Box, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '../hooks/debounce';

interface IProps {
  onChange: (v: string) => void;
}

export function SearchInput({ onChange }: IProps) {
  const form = useForm({
    initialValues: {
      search: '',
    },

    validate: {
      search: (value: string) => (value.length > 4 ? null : 'Please type at least 4 chars'),
    },
  });

  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onChange]);

  return (
    <Box>
      <form onSubmit={form.onSubmit((values: any) => console.log(values))}>
        <TextInput
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setSearchTerm(ev.target.value)}
          placeholder="Search for a game..."
        />
      </form>
    </Box>
  );
}

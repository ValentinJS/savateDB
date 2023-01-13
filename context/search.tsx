import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface IProps extends React.PropsWithChildren {}

export type SearchTerm = string | undefined;

export interface SearchContext {
  search?: string;
  setSearch: Dispatch<SetStateAction<SearchTerm>>;
}

const intialValue: SearchContext = {
  search: undefined,
  setSearch: () => {},
};

const SearchContext = createContext(intialValue);

export function SearchProvider({ children }: IProps) {
  const [search, setSearch] = useState<SearchTerm>(intialValue.search);

  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
}

export function useSearchContext() {
  return useContext(SearchContext);
}

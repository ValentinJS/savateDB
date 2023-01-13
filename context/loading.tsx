import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface IProps extends React.PropsWithChildren {}

export interface LoadingContext {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const intialValue: LoadingContext = {
  loading: false,
  setLoading: () => {},
};

const LoadingContext = createContext(intialValue);

export function LoadingProvider({ children }: IProps) {
  const [loading, setLoading] = useState<boolean>(intialValue.loading);

  return <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>;
}

export function useLoadingContext() {
  return useContext(LoadingContext);
}

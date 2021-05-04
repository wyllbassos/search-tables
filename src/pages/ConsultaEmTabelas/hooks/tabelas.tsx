import React, { createContext, useContext, useState, useCallback } from 'react';

type ITabelasStateData = {};

export interface ITabelasContextData extends ITabelasStateData {}

const TabelasContext = createContext<ITabelasContextData>(
  {} as ITabelasContextData
);

type TabelasProviderProps = {
  children: React.ReactNode;
};

export const TabelasProvider: React.FC<TabelasProviderProps> = ({
  children,
}: TabelasProviderProps) => {
  const [state, setState] = useState<ITabelasStateData>({});

  return (
    <TabelasContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </TabelasContext.Provider>
  );
};

export const useTabelas = (): ITabelasContextData => {
  const context = useContext(TabelasContext);

  if (!context) {
    throw new Error('useTabelas must be used withn a TabelasProvider');
  }

  return context;
};

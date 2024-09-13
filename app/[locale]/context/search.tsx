// 'use client';

// import { createContext, useContext, useState } from 'react';

// // create context
// export const SearchContext = createContext();

// // provider
// export const SearchContextProvider = ({ children }) => {
//   const [searchActive, setSearchActive] = useState(false);
//   return (
//     <SearchContext.Provider value={{ searchActive, setSearchActive }}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

// export const useSearchContext = () => useContext(SearchContext);

'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the shape of the context
interface SearchContextType {
  searchActive: boolean;
  setSearchActive: Dispatch<SetStateAction<boolean>>;
}

// create context with default values
export const SearchContext = createContext<SearchContextType | undefined>(undefined);

// provider
interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [searchActive, setSearchActive] = useState<boolean>(false);

  return (
    <SearchContext.Provider value={{ searchActive, setSearchActive }}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook to use the SearchContext
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchContextProvider');
  }

  return context;
};


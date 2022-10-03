import { useContext, createContext } from "react";

// Using the createContext API to create a new context for our app.
// Using the useContext React Hook to access the context.

export const AppContext = createContext(null);

export const useAppContext = () => {
  return useContext(AppContext);
};

import { createContext, useState, ReactNode, useContext } from "react";


interface HeaderContextType {
  isToggled: boolean;
  toggle: () => void;
}


export const RefetchContext = createContext<HeaderContextType | undefined>(undefined);


export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [isToggled, setIsToggled] = useState<boolean>(true);

  function toggle() {
    setIsToggled((prev) => !prev);
  }

  return (
    <RefetchContext.Provider value={{ isToggled, toggle }}>
      {children}
    </RefetchContext.Provider>
  );
};
export const useRefetch = () => {
  const context = useContext(RefetchContext);
  if (!context) {
    throw new Error("useRefetch must be used within an RefetchContext");
  }
  return context;
};

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
  setSidebarState: (state: boolean) => void; // Adicionando esta propriedade
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar, setSidebarState: setIsExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

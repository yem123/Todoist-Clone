import { useContext } from "react";
import SidebarContext from "../src/context/SidebarContext.jsx";

const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export default useSidebarContext;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import { TaskProvider } from "./context/TaskContext.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { UpcomingProvider } from "./context/UpcomingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
      <SidebarProvider>
        <UpcomingProvider>
          <App />
        </UpcomingProvider>
      </SidebarProvider>
    </TaskProvider>
  </StrictMode>
);

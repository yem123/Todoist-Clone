import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./src/styles/global.css";
import { TaskProvider } from "./src/context/TaskContext.jsx";
import { SidebarProvider } from "./src/context/SidebarContext.jsx";
import { UpcomingProvider } from "./src/context/UpcomingContext.jsx";

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

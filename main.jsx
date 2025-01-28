import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./src/styles/global.css";
import { TaskProvider } from "./src/context/TaskProvider.jsx";
import { SidebarProvider } from "./src/context/SidebarProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SidebarProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </SidebarProvider>
  </StrictMode>
);

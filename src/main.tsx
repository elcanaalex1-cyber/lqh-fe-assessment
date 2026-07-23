import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.scss";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/auth/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);

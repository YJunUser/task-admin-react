import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "unauthenticateApp";
import { AuthenticatedApp } from "./antuenticatedApp";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? (
        <AuthenticatedApp></AuthenticatedApp>
      ) : (
        <UnauthenticatedApp></UnauthenticatedApp>
      )}
    </div>
  );
}

export default App;

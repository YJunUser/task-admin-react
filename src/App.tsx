import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "unauthenticateApp";
import { AuthenticatedApp } from "./antuenticatedApp";

function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="App">
      {user ? (
        <AuthenticatedApp></AuthenticatedApp>
      ) : (
        <UnauthenticatedApp></UnauthenticatedApp>
      )}

      {/*<ProjectListScreen />*/}
    </div>
  );
}

export default App;

import React from "react";
import MethodSelector from "./components/MethodSelector";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between font-mono">
      <MethodSelector />
      <footer className="mb-2 flex flex-col justify-center text-center">
        <p className="text-xs text-gray-500"> cosc 110 - Group 3</p>
        <p className="text-xs text-gray-500">
          K.R Nuesca | S.H Nuestro | J. Bacalla
        </p>
      </footer>
    </div>
  );
};

export default App;

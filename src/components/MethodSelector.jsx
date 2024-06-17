import React, { useState } from "react";
import Bisection from "./Bisection";
import FalsePosition from "./FalsePosition";
import NewtonRaphson from "./NewtonRaphson";
import Secant from "./Secant";
import HowToUse from "./howtouse";

const MethodSelector = () => {
  const [selectedMethod, setSelectedMethod] = useState("Bisection");

  const renderMethodComponent = () => {
    switch (selectedMethod) {
      case "Bisection":
        return <Bisection />;
      case "FalsePosition":
        return <FalsePosition />;
      case "NewtonRaphson":
        return <NewtonRaphson />;
      case "Secant":
        return <Secant />;
      default:
        return <Bisection />;
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="mt-4 text-center text-4xl font-black">
        Root Finding Methods
      </h1>
      <p className="text-center text-base text-gray-600">
        Bracket Method: Bisection & False-Position
      </p>
      <p className="mb-4 text-center text-base text-gray-600">
        Open Method: Newton-Raphson & Secant
      </p>
      <select
        className="rounded-lg border border-gray-300 p-2 text-xl font-semibold"
        value={selectedMethod}
        onChange={(e) => setSelectedMethod(e.target.value)}
      >
        <option value="Bisection">Bisection Method</option>
        <option value="FalsePosition">False Position Method</option>
        <option value="NewtonRaphson">Newton-Raphson Method</option>
        <option value="Secant">Secant Method</option>
      </select>
      {renderMethodComponent()}
      <HowToUse />
    </div>
  );
};

export default MethodSelector;

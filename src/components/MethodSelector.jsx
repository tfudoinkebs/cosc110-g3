import React, { useState } from "react";
import Bisection from "./Bisection";
import FalsePosition from "./FalsePosition";
import NewtonRaphson from "./NewtonRaphson";
import Secant from "./Secant";

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
    <div>
      <h1>Root Finding Methods</h1>
      <select
        value={selectedMethod}
        onChange={(e) => setSelectedMethod(e.target.value)}
      >
        <option value="Bisection">Bisection Method</option>
        <option value="FalsePosition">False Position Method</option>
        <option value="NewtonRaphson">Newton-Raphson Method</option>
        <option value="Secant">Secant Method</option>
      </select>
      {renderMethodComponent()}
    </div>
  );
};

export default MethodSelector;

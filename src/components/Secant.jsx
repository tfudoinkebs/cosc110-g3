import React, { useState } from "react";
import { evaluate } from "mathjs";

const Secant = () => {
  const [functionStr, setFunctionStr] = useState("");
  const [x0, setX0] = useState("");
  const [x1, setX1] = useState("");
  const [roundOff, setRoundOff] = useState("4");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const f = (x) => evaluate(functionStr, { x });
      let x0Num = parseFloat(x0);
      let x1Num = parseFloat(x1);
      let decimalPlaces = parseInt(roundOff);
      let x2;
      let iterationData = [];

      let relativeError = 100; // Initialize relative error to 100% for the first iteration

      let iterationCount = 1; // Start iteration count from 1

      do {
        x2 = x1Num - f(x1Num) * ((x1Num - x0Num) / (f(x1Num) - f(x0Num)));

        // Calculate relative error for all iterations
        relativeError = Math.abs(((x2 - x1Num) / x2) * 100);

        iterationData.push({
          iteration: iterationCount,
          xa: parseFloat(x0Num.toFixed(decimalPlaces)),
          xb: parseFloat(x1Num.toFixed(decimalPlaces)),
          fxa: parseFloat(f(x0Num).toFixed(decimalPlaces)),
          fxb: parseFloat(f(x1Num).toFixed(decimalPlaces)),
          relativeError: parseFloat(relativeError.toFixed(2)),
        });

        if (relativeError.toFixed(2) === "0.00") {
          break;
        }

        x0Num = x1Num;
        x1Num = x2;
        iterationCount++;
      } while (true);

      setIterations(iterationData);
      setResult(x2.toFixed(decimalPlaces));
      setError(null);
    } catch (error) {
      setError("Invalid function expression. Please check your input.");
    }
  };

  const handleReset = () => {
    setFunctionStr("");
    setX0("");
    setX1("");
    setRoundOff("4");
    setResult(null);
    setIterations([]);
    setError(null);
  };

  return (
    <div>
      <h2>Secant Method</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Function:{" "}
          <input
            disabled={result !== null}
            type="text"
            value={functionStr}
            onChange={(e) => setFunctionStr(e.target.value)}
            required
          />
        </label>
        <label>
          x0:{" "}
          <input
            type="number"
            value={x0}
            onChange={(e) => setX0(e.target.value)}
            required
          />
        </label>
        <label>
          x1:{" "}
          <input
            type="number"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
            required
          />
        </label>
        <label>
          Round Off (decimal places):{" "}
          <input
            type="number"
            value={roundOff}
            onChange={(e) => setRoundOff(e.target.value)}
          />
        </label>
        <button type="submit">Find Root</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
      {iterations.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Iteration</th>
              <th>Xa</th>
              <th>Xb</th>
              <th>f(Xa)</th>
              <th>f(Xb)</th>
              <th>Relative Error</th>
            </tr>
          </thead>
          <tbody>
            {iterations.map((iter, index) => (
              <tr key={index}>
                <td>{iter.iteration}</td>
                <td>{iter.xa}</td>
                <td>{iter.xb}</td>
                <td>{iter.fxa}</td>
                <td>{iter.fxb}</td>
                <td>{iter.relativeError}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {result !== null && (
        <div>
          Root: {result}, f(root) ={" "}
          {evaluate(functionStr, { x: result }).toFixed(roundOff)}
        </div>
      )}
    </div>
  );
};

export default Secant;

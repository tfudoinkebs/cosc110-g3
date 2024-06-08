import React, { useState } from "react";
import { evaluate, derivative } from "mathjs";

const NewtonRaphson = () => {
  const [functionStr, setFunctionStr] = useState("");
  const [initialGuess, setInitialGuess] = useState("");
  const [precision, setPrecision] = useState("0.1");
  const [roundOff, setRoundOff] = useState("4");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const f = (x) => evaluate(functionStr, { x });
      const df = (x) =>
        evaluate(derivative(functionStr, "x").toString(), { x });
      let x0 = parseFloat(initialGuess);
      let tol = parseFloat(precision);
      let decimalPlaces = parseInt(roundOff);
      let x1;
      let prevX = x0;
      let iterationData = [];

      let iteration = 1; // Start from 1 to correctly count the iterations

      do {
        x1 = x0 - f(x0) / df(x0);
        let relativeError = Math.abs((x1 - prevX) / x1) * 100;
        iterationData.push({
          iteration: iteration,
          x: parseFloat(x1.toFixed(decimalPlaces)),
          fx: parseFloat(f(x1).toFixed(decimalPlaces)),
          dfx: parseFloat(df(x1).toFixed(decimalPlaces)),
          relativeError: parseFloat(relativeError.toFixed(2)),
        });

        if (Math.abs(x1 - x0) < tol || relativeError === 0) {
          break;
        }
        prevX = x1;
        x0 = x1;
        iteration++;
      } while (true);

      // Add one more iteration with relative error of 0%
      if (
        iterationData.length > 0 &&
        iterationData[iterationData.length - 1].relativeError !== "0.00%"
      ) {
        iterationData.push({
          iteration: iterationData.length + 1,
          x: x1.toFixed(decimalPlaces),
          fx: "0",
          dfx: df(x1).toFixed(decimalPlaces),
          relativeError: "0.00%",
        });
      }

      setIterations(iterationData);
      setResult(x1.toFixed(decimalPlaces));
      setError(null);
    } catch (error) {
      setError("Invalid function expression. Please check your input.");
    }
  };

  const handleReset = () => {
    setFunctionStr("");
    setInitialGuess("");
    setPrecision("0.1");
    setRoundOff("4");
    setResult(null);
    setIterations([]);
    setError(null);
  };

  return (
    <div>
      <h2>Newton-Raphson Method</h2>
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
          Initial Value for Xo:{" "}
          <input
            type="number"
            value={initialGuess}
            onChange={(e) => setInitialGuess(e.target.value)}
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
              <th>Iterations</th>
              <th>x</th>
              <th>f(x)</th>
              <th>f'(x)</th>
              <th>Relative Error</th>
            </tr>
          </thead>
          <tbody>
            {iterations.map((iter) => (
              <tr key={iter.iteration}>
                <td>{iter.iteration}</td>
                <td>{iter.x}</td>
                <td>{iter.fx}</td>
                <td>{iter.dfx}</td>
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

export default NewtonRaphson;

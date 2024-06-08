import React, { useState } from "react";
import { evaluate } from "mathjs";

const FalsePosition = () => {
  const [originalFunctionStr, setOriginalFunctionStr] = useState("");
  const [functionStr, setFunctionStr] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [precision, setPrecision] = useState("0.1");
  const [roundOff, setRoundOff] = useState("4");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const f = (x) => evaluate(functionStr, { x });
      let aNum = parseFloat(a);
      let bNum = parseFloat(b);
      let tol = parseFloat(precision);
      let decimalPlaces = parseInt(roundOff);
      let c;
      let iterationData = [];

      if (f(aNum) * f(bNum) >= 0) {
        setError("Function values at the endpoints must have opposite signs.");
        return;
      }

      do {
        c = aNum - (f(aNum) * (bNum - aNum)) / (f(bNum) - f(aNum));
        iterationData.push({
          xl: aNum.toFixed(decimalPlaces),
          xr: bNum.toFixed(decimalPlaces),
          xm: c.toFixed(decimalPlaces),
          yl: f(aNum).toFixed(decimalPlaces),
          yr: f(bNum).toFixed(decimalPlaces),
          ym: f(c).toFixed(decimalPlaces),
        });

        if (Math.abs(f(c)) <= tol) {
          setResult(c.toFixed(decimalPlaces));
          setError(null);
          break;
        } else if (f(c) * f(aNum) < 0) {
          bNum = c;
        } else {
          aNum = c;
        }
      } while (Math.abs(f(c)) > tol);

      setIterations(iterationData);
    } catch (error) {
      setError("Invalid function expression. Please check your input.");
    }
  };

  const handleReset = () => {
    setOriginalFunctionStr("");
    setFunctionStr("");
    setA("");
    setB("");
    setPrecision("0.0001");
    setRoundOff("4");
    setResult(null);
    setIterations([]);
    setError(null);
  };

  return (
    <div>
      <h2>False Position Method</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Function:{" "}
          <input
            disabled={result !== null}
            type="text"
            value={functionStr}
            onChange={(e) => {
              setOriginalFunctionStr(e.target.value);
              setFunctionStr(e.target.value);
            }}
            required
          />
        </label>
        <label>
          XL:{" "}
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            required
          />
        </label>
        <label>
          XR:{" "}
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            required
          />
        </label>
        <label>
          Precision:{" "}
          <input
            type="number"
            step="any"
            value={precision}
            onChange={(e) => setPrecision(e.target.value)}
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
      {result !== null && (
        <div>
          Root: {result}, f(root) ={" "}
          {evaluate(originalFunctionStr, { x: result }).toFixed(roundOff)}
        </div>
      )}
      {iterations.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Iteration</th>
              <th>XL</th>
              <th>XM</th>
              <th>XR</th>
              <th>YL</th>
              <th>YM</th>
              <th>YR</th>
            </tr>
          </thead>
          <tbody>
            {iterations.map((iter, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{iter.xl}</td>
                <td>{iter.xm}</td>
                <td>{iter.xr}</td>
                <td>{iter.yl}</td>
                <td>{iter.ym}</td>
                <td>{iter.yr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default FalsePosition;

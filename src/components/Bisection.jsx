import React, { useState } from "react";
import { evaluate } from "mathjs";

const Bisection = () => {
  const [originalFunctionStr, setOriginalFunctionStr] = useState("");
  const [functionStr, setFunctionStr] = useState("");
  const [xl, setXL] = useState("");
  const [xr, setXR] = useState("");
  const [precision, setPrecision] = useState("0.1");
  const [roundOff, setRoundOff] = useState("4");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const f = (x) => evaluate(functionStr, { x });
      let xlNum = parseFloat(xl);
      let xrNum = parseFloat(xr);
      let tol = parseFloat(precision);
      let decimalPlaces = parseInt(roundOff);
      let xm,
        iterationData = [];

      let prevYm = null; // Store the previous Ym value
      let prevPrevYm = null; // Store the Ym value of the iteration before the previous one
      let currentIteration = 1;

      do {
        xm = (xlNum + xrNum) / 2;
        let yl = f(xlNum);
        let ym = f(xm);
        let yr = f(xrNum);

        iterationData.push({
          iteration: currentIteration,
          xl: parseFloat(xlNum.toFixed(decimalPlaces)),
          xm: parseFloat(xm.toFixed(decimalPlaces)),
          xr: parseFloat(xrNum.toFixed(decimalPlaces)),
          yl: parseFloat(yl.toFixed(decimalPlaces)),
          ym: parseFloat(ym.toFixed(decimalPlaces)),
          yr: parseFloat(yr.toFixed(decimalPlaces)),
        });

        if (Math.abs(ym - prevYm) < 0.1) {
          break;
        }

        if (yl * ym < 0) {
          xrNum = xm;
        } else {
          xlNum = xm;
        }

        // Check if prevPrevYm has a value (not null) and if the difference between current Ym and prevPrevYm is less than 0.1
        if (prevPrevYm !== null && Math.abs(ym - prevPrevYm) < 0.1) {
          break;
        }

        prevPrevYm = prevYm; // Update the Ym value of the iteration before the previous one
        prevYm = ym; // Update the previous Ym value
        currentIteration++;
      } while (true);

      setIterations(iterationData);
      setResult(xm.toFixed(decimalPlaces));
      setError(null);
    } catch (error) {
      setError("Invalid function expression. Please check your input.");
    }
  };

  const handleReset = () => {
    setFunctionStr(originalFunctionStr);
    setXL("");
    setXR("");
    setPrecision("0.1");
    setRoundOff("4");
    setResult(null);
    setIterations([]);
    setError(null);
  };

  return (
    <div>
      <h2>Bisection Method</h2>
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
            value={xl}
            onChange={(e) => setXL(e.target.value)}
            required
          />
        </label>
        <label>
          XR:{" "}
          <input
            type="number"
            value={xr}
            onChange={(e) => setXR(e.target.value)}
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
      {result !== null && (
        <div>
          Root: {result}, f(root) ={" "}
          {evaluate(originalFunctionStr, { x: result }).toFixed(roundOff)}
        </div>
      )}
    </div>
  );
};

export default Bisection;

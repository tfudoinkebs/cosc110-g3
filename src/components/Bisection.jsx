import React, { useState } from "react";
import { evaluate } from "mathjs";

const Bisection = () => {
  const [originalFunctionStr, setOriginalFunctionStr] = useState("");
  const [functionStr, setFunctionStr] = useState("");
  const [xl, setXL] = useState("1");
  const [xr, setXR] = useState("2");
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
    <div className="flex w-full flex-col items-center justify-center">
      <form className="flex w-full flex-col" onSubmit={handleSubmit}>
        <label className="flex w-full flex-col">
          <div className="flex w-full items-end justify-center gap-2 pt-4 text-sm font-semibold">
            <div className="flex h-auto w-auto flex-col items-center justify-center">
              <h2 className="flex w-auto text-sm font-semibold">Equation</h2>
              <input
                className="flex w-full items-center justify-center rounded-lg border-2 p-2 text-center font-semibold"
                onChange={(e) => {
                  try {
                    new Function(`return ${e.target.value}`);
                    setOriginalFunctionStr(e.target.value);
                    setFunctionStr(e.target.value);
                  } catch (error) {
                    console.error(
                      "Invalid function expression. Please check your input.",
                    );
                  }
                }}
                required
              />
            </div>
            <button className="rounded-lg border-2 p-2" type="submit">
              Calculate
            </button>
            <button
              className="rounded-lg border-2 p-2"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </label>
        <div className="flex w-full flex-wrap items-center justify-center gap-2 pt-4">
          <label className="flex flex-col gap-1">
            <span className="pr-2 text-sm font-semibold">
              X<sub className="font-semibold">L</sub>
            </span>

            <input
              className="w-20 rounded-lg border-2 px-2 py-1"
              type="number"
              value={xl}
              onChange={(e) => setXL(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="pr-2 text-sm font-semibold">
              X<sub className="font-semibold">R</sub>
            </span>
            <input
              className="w-20 rounded-lg border-2 px-2 py-1"
              type="number"
              value={xr}
              onChange={(e) => setXR(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="pr-2 text-sm font-semibold">Precision</span>
            <input
              className="w-20 rounded-lg border-2 px-2 py-1"
              type="number"
              step="any"
              value={precision}
              onChange={(e) => setPrecision(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="pr-2 text-sm font-semibold">Round Off</span>
            <input
              className="w-20 rounded-lg border-2 px-2 py-1"
              type="number"
              value={roundOff}
              onChange={(e) => setRoundOff(e.target.value)}
            />
          </label>
        </div>
      </form>
      <div className="mt-4 flex w-full flex-col overflow-x-auto px-4 md:w-4/5 lg:w-3/5">
        <table className="min-w-max">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-lg border-b bg-slate-100 text-left">
              <th className="p-1">Iteration</th>
              <th className="border-x border-gray-200 p-2">
                X<sub>L</sub>
              </th>
              <th className="border-x border-gray-200 p-2">
                X<sub>M</sub>
              </th>
              <th className="border-x border-gray-200 p-2">
                X<sub>R</sub>
              </th>
              <th className="border-x border-gray-200 p-2">
                Y<sub>L</sub>
              </th>
              <th className="border-x border-gray-200 p-2">
                Y<sub>M</sub>
              </th>
              <th className="border-l border-gray-200 p-2">
                Y<sub>R</sub>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {iterations.length > 0 ? (
              iterations.map((iter, index) => (
                <tr key={index} className="grid grid-cols-7 border-b">
                  <td className="border-x border-gray-200 p-2">{index + 1}</td>
                  <td className="border-x border-gray-200 p-2">{iter.xl}</td>
                  <td className="border-x border-gray-200 p-2">{iter.xm}</td>
                  <td className="border-x border-gray-200 p-2">{iter.xr}</td>
                  <td className="border-x border-gray-200 p-2">{iter.yl}</td>
                  <td className="border-x border-gray-200 p-2">{iter.ym}</td>
                  <td className="border-x border-gray-200 p-2">{iter.yr}</td>
                </tr>
              ))
            ) : (
              <tr className="grid grid-cols-7 gap-2 border-b">
                <td className="border-gray-200 p-5"></td>
                <td className="border-gray-200 p-5"></td>
                <td className="border-gray-200 p-5"></td>
                <td className="border-gray-200 p-5"></td>
                <td className="border-gray-200 p-5"></td>
                <td className="border-gray-200 p-5"></td>
                <td className="border-gray-200 p-5"></td>
              </tr>
            )}
          </tbody>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {result !== undefined &&
            (() => {
              let tableRow = iterations.find(
                (row) =>
                  parseFloat(row.xm.toFixed(roundOff)) === parseFloat(result),
              );
              let displayResult = tableRow ? tableRow.ym : "n/a ";
              return (
                <div className="flex w-full items-center justify-between rounded-b-lg bg-slate-100 p-2">
                  <span>
                    <span className="font-semibold">Root:</span> {result}
                  </span>
                  <span>
                    <span className="font-semibold">f(x)</span>: {displayResult}
                  </span>
                </div>
              );
            })()}
        </table>
      </div>
    </div>
  );
};

export default Bisection;

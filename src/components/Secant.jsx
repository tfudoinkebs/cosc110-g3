import React, { useState } from "react";
import { evaluate } from "mathjs";

const Secant = () => {
  const [functionStr, setFunctionStr] = useState("");
  const [x0, setX0] = useState("1");
  const [x1, setX1] = useState("2");
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
    <div className="flex w-full flex-col items-center justify-center">
      <form className="flex w-full flex-col" onSubmit={handleSubmit}>
        <label className="flex w-full flex-col">
          <div className="flex w-full items-end justify-center gap-2 pt-4 text-sm font-semibold">
            <div className="flex h-auto w-auto flex-col items-center justify-center">
              <h2 className="flex w-auto text-sm font-semibold">Equation</h2>
              <input
                className="flex w-full items-center justify-center rounded-lg border-2 p-2 text-center font-semibold"
                type="text"
                value={functionStr}
                onChange={(e) => setFunctionStr(e.target.value)}
                required
              />
            </div>
            <button
              className="rounded-lg border-2 p-2 hover:border-orange-500"
              type="submit"
            >
              Calculate
            </button>
            <button
              className="rounded-lg border-2 p-2 hover:border-red-600"
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
              X<sub className="font-semibold">a</sub>
            </span>
            <input
              className="w-20 rounded-lg border-2 px-2 py-1"
              type="number"
              value={x0}
              onChange={(e) => setX0(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="pr-2 text-sm font-semibold">
              X<sub className="font-semibold">b</sub>
            </span>
            <input
              className="w-20 rounded-lg border-2 px-2 py-1"
              type="number"
              value={x1}
              onChange={(e) => setX1(e.target.value)}
              required
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
            <tr className="grid grid-cols-6 rounded-t-lg border-b bg-orange-500 text-left text-white">
              <th className="border-r border-gray-200 p-2">Iteration</th>
              <th className="border-x border-gray-200 p-2">Xa</th>
              <th className="border-x border-gray-200 p-2">Xb</th>
              <th className="border-x border-gray-200 p-2">f(Xa)</th>
              <th className="border-x border-gray-200 p-2">f(Xb)</th>
              <th className="border-l border-gray-200 p-2">Relative Error</th>
            </tr>
          </thead>
          <tbody className="bg-slate-50">
            {iterations.length > 0 ? (
              iterations.map((iter, index) => (
                <tr
                  key={index}
                  className="grid grid-cols-6 border-b bg-slate-50"
                >
                  <td className="border-x border-gray-200 p-2">
                    {iter.iteration}
                  </td>
                  <td className="border-x border-gray-200 p-2">{iter.xa}</td>
                  <td className="border-x border-gray-200 p-2">{iter.xb}</td>
                  <td className="border-x border-gray-200 p-2">{iter.fxa}</td>
                  <td className="border-x border-gray-200 p-2">{iter.fxb}</td>
                  <td className="border-x border-gray-200 p-2">
                    {iter.relativeError}%
                  </td>
                </tr>
              ))
            ) : (
              <tr className="grid grid-cols-6 gap-2 border-b">
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
          {result !== null &&
            (() => {
              let tableRow = iterations.find(
                (row) =>
                  parseFloat(row.xb.toFixed(roundOff)) === parseFloat(result),
              );
              let displayResult = tableRow ? tableRow.fxb : "n/a ";
            })()}
        </table>
      </div>
    </div>
  );
};

export default Secant;

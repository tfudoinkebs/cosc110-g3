import React, { useState } from "react";
import { evaluate, derivative } from "mathjs";

const NewtonRaphson = () => {
  const [originalFunctionStr, setOriginalFunctionStr] = useState("");
  const [functionStr, setFunctionStr] = useState("");
  const [initialGuess, setInitialGuess] = useState("1");
  const [precision, setPrecision] = useState("0.0001");
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
      let iteration = 1;

      // First iteration initialization
      iterationData.push({
        iteration: iteration,
        x: parseFloat(x0.toFixed(decimalPlaces)),
        fx: parseFloat(f(x0).toFixed(decimalPlaces)),
        dfx: parseFloat(df(x0).toFixed(decimalPlaces)),
        relativeError: null,
      });

      do {
        x1 = x0 - f(x0) / df(x0);
        let relativeError = Math.abs((x1 - x0) / x1) * 100; // Corrected

        iteration++;
        iterationData.push({
          iteration: iteration,
          x: parseFloat(x1.toFixed(decimalPlaces)),
          fx: parseFloat(f(x1).toFixed(decimalPlaces)),
          dfx: parseFloat(df(x1).toFixed(decimalPlaces)),
          relativeError: parseFloat(relativeError.toFixed(2)),
        });

        if (relativeError < tol) {
          break;
        }

        x0 = x1;
      } while (true);

      setIterations(iterationData);
      setResult(x1.toFixed(decimalPlaces));
      setError(null);
    } catch (error) {
      setError("Invalid function expression. Please check your input.");
    }
  };

  const handleReset = () => {
    setFunctionStr(originalFunctionStr);
    setInitialGuess("");
    setPrecision("0.0001");
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
            <span className="pr-2 text-sm font-semibold">Initial Guess</span>
            <input
              className="w-20 rounded-lg border-2 px-2 py-1"
              type="number"
              value={initialGuess}
              onChange={(e) => setInitialGuess(e.target.value)}
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
          <label className="flex flex-col gap-1">
            <span className="pr-2 text-sm font-semibold">Precision</span>
            <input
              className="w-20 rounded-lg border-2 px-2 py-1"
              type="number"
              value={precision}
              onChange={(e) => setPrecision(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
      <div className="mt-4 flex w-full flex-col overflow-x-auto px-4 md:w-4/5 lg:w-3/5">
        <table className="min-w-max">
          <thead>
            <tr className="grid grid-cols-5 rounded-t-lg border-b bg-orange-500 text-left text-white">
              <th className="border-r border-gray-200 p-2">Iteration</th>
              <th className="border-x border-gray-200 p-2">x</th>
              <th className="border-x border-gray-200 p-2">f(x)</th>
              <th className="border-x border-gray-200 p-2">f'(x)</th>
              <th className="border-l border-gray-200 p-2">Relative Error</th>
            </tr>
          </thead>
          <tbody className="bg-slate-50">
            {iterations.length > 0 ? (
              iterations.map((iter, index) => (
                <tr
                  key={index}
                  className="grid grid-cols-5 border-b bg-slate-50"
                >
                  <td className="border-x border-gray-200 p-2">
                    {iter.iteration}
                  </td>
                  <td className="border-x border-gray-200 p-2">{iter.x}</td>
                  <td className="border-x border-gray-200 p-2">{iter.fx}</td>
                  <td className="border-x border-gray-200 p-2">{iter.dfx}</td>
                  <td className="border-x border-gray-200 p-2">
                    {iter.relativeError !== null
                      ? `${iter.relativeError}%`
                      : ""}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="grid grid-cols-5 gap-2 border-b">
                <td className="border-gray-200 p-5"></td>
                <td className="border-gray-200 p-5"></td>
                <td className="border-gray-200 p-5"></td>
                <td className="border-gray-200 p-5"></td>
                <td className="border-gray-200 p-5"></td>
              </tr>
            )}
          </tbody>
        </table>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default NewtonRaphson;

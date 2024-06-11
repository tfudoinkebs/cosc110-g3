import React, { useState } from "react";
import { evaluate, derivative } from "mathjs";
import { FaRandom } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";

const NewtonRaphson = () => {
  const [functionStr, setFunctionStr] = useState("sin(sqrt(x))-x");
  const [initialGuess, setInitialGuess] = useState("1");
  const [precision, setPrecision] = useState("0.0001");
  const [roundOff, setRoundOff] = useState("4");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [error, setError] = useState(null);

  const generateRandomEquation = () => {
    const equations = [
      "sin(x) - 0.5",
      "x^3 - x^2 - 1",
      "cos(x) - x",
      "x^2 - 4",
      "tan(x) - 2*x",
      "x^3-2x-5",
      "x^3+2x^2-9",
    ];

    const randomIndex = Math.floor(Math.random() * equations.length);
    setFunctionStr(equations[randomIndex]);
  };

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
      let iterationData = [];
      let iteration = 1;

      iterationData.push({
        iteration: iteration,
        x: parseFloat(x0.toFixed(decimalPlaces)),
        fx: parseFloat(f(x0).toFixed(decimalPlaces)),
        dfx: parseFloat(df(x0).toFixed(decimalPlaces)),
        relativeError: null,
      });

      do {
        x1 = x0 - f(x0) / df(x0);
        let relativeError = Math.abs((x1 - x0) / x1) * 100;

        iteration++;
        iterationData.push({
          iteration: iteration,
          x: parseFloat(x1.toFixed(decimalPlaces)),
          fx: parseFloat(f(x1).toFixed(decimalPlaces)),
          dfx: parseFloat(df(x1).toFixed(decimalPlaces)),
          relativeError: parseFloat(relativeError.toFixed(2)),
        });

        if (Math.abs(f(x1)) <= tol) {
          break;
        }

        x0 = x1;
      } while (true);

      setIterations(iterationData);
      setResult(x1.toFixed(decimalPlaces));
      setError(null);
    } catch (error) {
      handleError();
      setError("Invalid function expression. Please check your input.");
    }
  };

  const handleError = () => {
    setIterations([]);
  };

  const handleReset = () => {
    setFunctionStr("");
    setInitialGuess("1");
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
            <button
              className="ml-2 rounded-lg border-2 p-2 hover:border-orange-500"
              type="button"
              onClick={generateRandomEquation}
            >
              <p className="hidden md:block">Randomize</p>
              <FaRandom className="block size-5 md:hidden" />
            </button>
            <div className="ml-2 flex h-auto w-2/3 flex-col items-center justify-center md:w-1/3">
              <h2 className="flex w-auto text-sm font-semibold">Equation</h2>
              <input
                className="flex w-full items-center justify-center rounded-lg border-2 p-2 text-center font-semibold"
                type="text"
                value={functionStr}
                onChange={(e) => {
                  setFunctionStr(e.target.value);
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
              className="mr-2 rounded-lg border-2 p-2 hover:border-red-600"
              type="button"
              onClick={handleReset}
            >
              <p className="hidden md:block">Reset</p>{" "}
              <FaArrowRotateRight className="block size-5 md:hidden" />
            </button>
          </div>
        </label>
        <div className="flex w-full flex-wrap items-center justify-center gap-2 pt-4">
          <label className="flex flex-col gap-1">
            <span className="pr-2 text-sm font-semibold">Initial Guess</span>
            <input
              className="w-28 rounded-lg border-2 px-2 py-1"
              type="number"
              value={initialGuess}
              onChange={(e) => setInitialGuess(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="pr-2 text-sm font-semibold">Precision</span>
            <input
              className="w-24 rounded-lg border-2 px-2 py-1"
              type="number"
              value={precision}
              onChange={(e) => setPrecision(e.target.value)}
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
            {result !== undefined && (
              <tr className="flex w-full items-center justify-between rounded-b-lg bg-orange-500 p-2 text-white">
                <td>
                  <span className="font-semibold">Root:</span> {result}
                </td>
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

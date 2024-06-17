import React, { useState } from "react";
import { evaluate } from "mathjs";
import { FaRandom } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";

const Secant = () => {
  const [functionStr, setFunctionStr] = useState("x^3 + 3 * x^2 + 12 * x + 8");
  const [x0, setX0] = useState("1");
  const [x1, setX1] = useState("2");
  const [roundOff, setRoundOff] = useState("4");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [error, setError] = useState(null);
  const [precision, setPrecision] = useState("0.0001");

  const generateRandomEquation = () => {
    const equations = [
      "sin(x) - 0.5",
      "x^3 - x^2 - 1",
      "cos(x) - x",
      "tan(x) - 2*x",
      "x^3 - 2x - 5",
      "x^3 + 2x^2 - 9",
      "sin(sqrt(x))-x",
    ];

    const randomIndex = Math.floor(Math.random() * equations.length);
    setFunctionStr(equations[randomIndex]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const f = (x) => evaluate(functionStr, { x });
      let x0Num = parseFloat(x0);
      let x1Num = parseFloat(x1);
      let decimalPlaces = parseInt(roundOff);
      let x2;
      let iterationData = [];
      let previousRelativeError = null;
      let iterationCount = 1;

      do {
        x2 = x1Num - f(x1Num) * ((x1Num - x0Num) / (f(x1Num) - f(x0Num)));

        let currentRelativeError = Math.abs(((x2 - x1Num) / x2) * 100);

        iterationData.push({
          iteration: iterationCount,
          xa: parseFloat(x0Num.toFixed(decimalPlaces)),
          xb: parseFloat(x1Num.toFixed(decimalPlaces)),
          fxa: parseFloat(f(x0Num).toFixed(decimalPlaces)),
          fxb: parseFloat(f(x1Num).toFixed(decimalPlaces)),
          relativeError:
            previousRelativeError !== null
              ? parseFloat(previousRelativeError.toFixed(2))
              : "",
        });

        if (
          f(x2) == 0 ||
          currentRelativeError < parseFloat(precision) ||
          iterationCount >= 10
        ) {
          break;
        }

        x0Num = x1Num;
        x1Num = x2;
        iterationCount++;

        previousRelativeError = currentRelativeError;
      } while (true);

      setIterations(iterationData);
      setResult(x2.toFixed(decimalPlaces));
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
    setX0("1");
    setX1("2");
    setPrecision("0.0001");
    setRoundOff("4");
    setResult(null);
    setIterations([]);
    setError(null);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form className="flex w-full flex-col" onSubmit={handleSubmit}>
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

        <div className="flex w-full flex-wrap items-center justify-center gap-2 pt-4">
          <label className="flex flex-col gap-1">
            <span className="pr-2 text-sm font-semibold">
              X<sub className="font-semibold">A</sub>
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
              X<sub className="font-semibold">B</sub>
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
            <tr className="grid grid-cols-6 rounded-t-lg border-b bg-orange-500 text-left text-white">
              <th className="border-r border-gray-200 p-2">Iteration</th>
              <th className="border-x border-gray-200 p-2">
                X<sub>A</sub>
              </th>
              <th className="border-x border-gray-200 p-2">
                X<sub>B</sub>
              </th>
              <th className="border-x border-gray-200 p-2">
                f(X<sub>A</sub>)
              </th>
              <th className="border-x border-gray-200 p-2">
                f(X<sub>B</sub>)
              </th>
              <th className="border-l border-gray-200 p-2">
                Relative
                <br />
                Error
              </th>
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
                    {iter.iteration > 1
                      ? `${iter.relativeError}%`
                      : iter.relativeError}
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

export default Secant;

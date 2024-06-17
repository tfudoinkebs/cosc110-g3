import React, { useState } from "react";
import { evaluate } from "mathjs";
import { FaRandom } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";

const FalsePosition = () => {
  const [functionStr, setFunctionStr] = useState("2x^3 - 2x - 5");
  const [a, setA] = useState("1");
  const [b, setB] = useState("2");
  const [precision, setPrecision] = useState("0.0001");
  const [roundOff, setRoundOff] = useState("4");
  const [result, setResult] = useState(null);
  const [iterations, setIterations] = useState([]);
  const [error, setError] = useState(null);

  const generateRandomEquation = () => {
    const equations = [
      "x^3 - 6*x^2 + 11*x - 6",
      "x^3 - 3*x^2 + 3*x - 1",
      "sin(x) - 0.5",
      "x^3 - x^2 - 1",
      "cos(x) - x",
      "tan(x) - 2*x",
    ];

    const randomIndex = Math.floor(Math.random() * equations.length);
    setFunctionStr(equations[randomIndex]);
  };

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
      let prevYm = null;
      let currentIteration = 1;

      let prevC = null;

      do {
        c = aNum - (f(aNum) * (bNum - aNum)) / (f(bNum) - f(aNum));
        let yl = f(aNum);
        let ym = f(c);
        let yr = f(bNum);

        iterationData.push({
          iteration: currentIteration,
          xl: parseFloat(aNum.toFixed(decimalPlaces)),
          xm: parseFloat(c.toFixed(decimalPlaces)),
          xr: parseFloat(bNum.toFixed(decimalPlaces)),
          yl: parseFloat(yl.toFixed(decimalPlaces)),
          ym: parseFloat(ym.toFixed(decimalPlaces)),
          yr: parseFloat(yr.toFixed(decimalPlaces)),
        });

        if (isNaN(ym) || ym === prevYm) {
          break;
        }

        if (prevC !== null && Math.abs(c - prevC) < tol) {
          break;
        }

        if (yl * ym < 0) {
          bNum = c;
        } else {
          aNum = c;
        }

        ym = f(c);

        if (prevYm !== null && Math.abs(ym - prevYm) < tol) {
          break;
        }

        prevYm = ym;
        prevC = c;
        currentIteration++;
      } while (true);

      setIterations(iterationData);
      setResult(c.toFixed(decimalPlaces));
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
    setA("1");
    setB("2");
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
          <div className="flex h-auto w-2/3 flex-col items-center justify-center md:w-1/3">
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
              X<sub className="font-semibold">L</sub>
            </span>
            <input
              className="w-20 rounded-lg border-2 px-2 py-1"
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
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
              value={b}
              onChange={(e) => setB(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="pr-2 text-sm font-semibold">Precision</span>
            <input
              className="w-24 rounded-lg border-2 px-2 py-1"
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
            <tr className="grid grid-cols-7 rounded-t-lg border-b bg-orange-500 text-left text-white">
              <th className="border-r border-gray-200 p-2">Iteration</th>
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
          <tbody className="bg-slate-50">
            {iterations.length > 0 ? (
              iterations.map((iter, index) => (
                <tr
                  key={index}
                  className="grid grid-cols-7 border-b bg-slate-50"
                >
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
            {result !== undefined &&
              (() => {
                // Find the last iteration data
                const lastIterationData = iterations[iterations.length - 1];
                // Extract the last value of Ym as f(x)
                const lastFofX = lastIterationData
                  ? lastIterationData.ym
                  : "n/a";
                return (
                  <tr className="flex w-full items-center justify-between rounded-b-lg bg-orange-500 p-2 text-white">
                    <td>
                      <span className="font-semibold">Root:</span> {result}
                    </td>
                    <td>
                      <span className="font-semibold">f(x)</span>: {lastFofX}
                    </td>
                  </tr>
                );
              })()}
          </tbody>
        </table>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default FalsePosition;

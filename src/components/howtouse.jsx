import React, { useState } from "react";

const HowToUse = () => {
  const [method, setMethod] = useState("bisection");
  const [showContent, setShowContent] = useState(true);

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div className="w-full p-4 pt-8 text-center font-mono text-sm md:w-4/5 lg:w-3/5">
      <button
        onClick={toggleContent}
        className="mb-4 text-lg font-bold underline"
      >
        How to Use the Root Finding Method?
      </button>
      {showContent && (
        <div>
          <div className="mb-4">
            <label htmlFor="method" className="font-semibold text-orange-500">
              Select a method:
            </label>
            <select
              id="method"
              className="ml-2 rounded-lg border-2 p-2"
              onChange={handleMethodChange}
            >
              <option value="bisection">Bisection</option>
              <option value="falsi">False Position</option>
              <option value="newton">Newton's Method</option>
              <option value="secant">Secant Method</option>
            </select>
          </div>
          {method === "bisection" || method === "falsi" ? (
            <>
              <p className="text-justify">
                1. Enter the{" "}
                <span className="font-semibold text-orange-500">equation</span>{" "}
                in the input field. The equation should be written in JavaScript
                syntax. For example, if your equation is "x^3 - x - 2", you
                should enter it as is.
              </p>{" "}
              <br />
              <p className="text-justify">
                2. Enter the initial values for{" "}
                <span className="font-semibold text-orange-500">xl and xr</span>
                . These are your initial guesses for the root of the equation.
              </p>{" "}
              <br />
              <p className="text-justify">
                3. Enter the{" "}
                <span className="font-semibold text-orange-500">
                  precision (tolerance)
                </span>
                . This is the error tolerance for the root. The method will stop
                iterating once the error is less than this value.
              </p>{" "}
              <br />
              <p className="text-justify">
                4. Enter the{" "}
                <span className="font-semibold text-orange-500">
                  round off (decimal places)
                </span>
                . This is the number of decimal places to which the root will be
                rounded off.
              </p>{" "}
              <br />
            </>
          ) : method === "newton" ? (
            <>
              <p className="text-justify">
                1. Enter the{" "}
                <span className="font-semibold text-orange-500">equation</span>{" "}
                in the input field. The equation should be written in JavaScript
                syntax. For example, if your equation is "sin(sqrt(x))-x", you
                should enter it as is.
              </p>{" "}
              <br />
              <p className="text-justify">
                2. Enter the initial value for{" "}
                <span className="font-semibold text-orange-500">Xo</span>. This
                is your initial guess for the root of the equation.
              </p>{" "}
              <br />
              <p className="text-justify">
                3. Enter the{" "}
                <span className="font-semibold text-orange-500">
                  round off (decimal places)
                </span>
                . This is the number of decimal places to which the root will be
                rounded off.
              </p>{" "}
              <br />
            </>
          ) : (
            <>
              <p className="text-justify">
                1. Enter the{" "}
                <span className="font-semibold text-orange-500">equation</span>{" "}
                in the input field. The equation should be written in JavaScript
                syntax. For example, if your equation is "x^3 + 2x^2 - 9", you
                should enter it as is.
              </p>{" "}
              <br />
              <p className="text-justify">
                2. Enter the initial values for{" "}
                <span className="font-semibold text-orange-500">x0 and x1</span>
                . These are your initial guesses for the root of the equation.
              </p>{" "}
              <br />
              <p className="text-justify">
                3. Enter the{" "}
                <span className="font-semibold text-orange-500">
                  round off (decimal places)
                </span>
                . This is the number of decimal places to which the root will be
                rounded off.
              </p>{" "}
              <br />
            </>
          )}
          <p className="text-justify">
            Click the "
            <span className="font-semibold text-orange-500">Calculate</span>"
            button to start the root finding process. The method will iterate
            until it finds a root that is within the specified error tolerance,
            or until it reaches the maximum number of iterations.
          </p>{" "}
          <br />
          <p className="text-justify">
            The results will be displayed in a table below the input fields. The
            table will show the iteration number, the current guess for the
            root, the value of the function at that guess, the value of the
            derivative at that guess, and the relative error.
          </p>{" "}
          <br />
        </div>
      )}
    </div>
  );
};

export default HowToUse;

import React, { useState } from "react";
import "./styles.css";

const Screen = (props) => {
  return (
    <div className="screen-wrapper">
      <h1>{props.res}</h1>
    </div>
  );
};

const Button = (props) => {
  return (
    <button className={props.class} onClick={props.click}>
      {props.value}
    </button>
  );
};

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClick = (e) => {
    const value = e.target.innerHTML;
    if (
      (calc.num === "0" && value === "0") ||
      calc.num.toString().length >= 7 ||
      (calc.num.toString().includes(".") && value === ".") ||
      (calc.res !== 0 && calc.num === 0 && value === ".")
    )
      return;

    setCalc({
      ...calc,
      num:
        calc.num === 0 && value === "."
          ? "0."
          : calc.num === "0" && value !== "."
          ? calc.num.substr(1) + value
          : calc.num === 0
          ? value
          : (calc.num += value),
      res: isNaN(Number(calc.res)) || calc.sign === "" ? 0 : calc.res,
    });
  };

  const abs = () => {
    setCalc({
      ...calc,
      num: calc.num * -1,
      res:
        calc.num === 0 && !isNaN(Number(calc.res)) ? calc.res * -1 : calc.res,
    });
  };

  const len = (num) =>
    Math.floor(num / 100).toString().length > 7
      ? 7
      : Math.floor(num / 100).toString().length;
  const fix = (num, fx, div) => Number((num / div).toFixed(7 - fx));

  const percent = () => {
    setCalc({
      ...calc,
      num: Math.abs(calc.num) < 0.00001 ? 0 : fix(calc.num, len(calc.num), 100),
      res:
        calc.num === 0 && !isNaN(Number(calc.res))
          ? fix(calc.res, len(calc.res), 100)
          : calc.res,
    });
  };

  const reset = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const result = () => {
    const [conNum, conRes] = [Number(calc.num), Number(calc.res)];

    const math = (a, b, sign) =>
      sign === "+"
        ? a + b
        : sign === "-"
        ? a - b
        : sign === "X"
        ? a * b
        : a / b;

    const total = math(conRes, conNum, calc.sign);
    const length = Math.abs(Math.floor(total)).toString().length;
    const count = length > 7 ? null : length;

    if (calc.num !== 0) {
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't do"
            : total.toString().startsWith("-") && count === null
            ? "-10M"
            : total > 0 && count === null
            ? "10M+"
            : fix(total, count, 1),
        num:
          calc.res === 0 ||
          (calc.res === 0 && calc.sign === "X") ||
          (calc.res === 0 && calc.sign === "/")
            ? calc.num
            : 0,
        sign: "",
      });

      if (calc.num !== 0 && calc.sign.length === 1) return fix(total, count, 1);
    }
  };

  const arit = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      res:
        calc.num === "0" && calc.sign === "/"
          ? "Can't do"
          : calc.num !== 0 && calc.sign.length === 1
          ? Math.abs(Math.ceil(result())).toString().length > 7
            ? result().toString().startsWith("-")
              ? "-10M"
              : "10M+"
            : result()
          : calc.res === 0
          ? calc.num
          : calc.res,
      num: 0,
    });
  };

  return (
    <div className="page-wrapper">
      <div className="calc-wrapper">
        <Screen res={calc.res === 0 || calc.num !== 0 ? calc.num : calc.res} />
        <div className="button-wrapper">
          {btnValues.map((el, index) => {
            return el.map((e, i) => {
              return (
                <Button
                  value={el[i]}
                  class={el[i] === "=" ? "equals" : ""}
                  click={
                    el[i] === "C"
                      ? reset
                      : el[i] === "+-"
                      ? abs
                      : el[i] === "%"
                      ? percent
                      : el[i] === "="
                      ? result
                      : el[i] === "/" ||
                        el[i] === "X" ||
                        el[i] === "-" ||
                        el[i] === "+"
                      ? arit
                      : numClick
                  }
                />
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default App;

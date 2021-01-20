import React, { useState, useEffect } from "react";
import "./App.css";

const Screen = ({ res }) => {
  return (
    <div className="screen-wrapper">
      <h1>{res}</h1>
    </div>
  );
};

const Button = ({ className, onClick, value }) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
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

  useEffect(() => {
    const getFontSize = (textLength) => {
      let baseFontSize = 60;
      let minus = 0;
      if (textLength > 8) {
        minus = textLength - 8;
      }

      return `${baseFontSize - minus * 3}px`;
    };
    const boxes = document.querySelectorAll(".screen-wrapper h1");
    boxes.forEach((box) => {
      box.style.fontSize = getFontSize(box.textContent.length);
    });
  }, [calc.num]);

  const numClick = (e) => {
    const value = e.target.innerHTML;
    if (
      (calc.num === "0" && value === "0") ||
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

  const invert = () => {
    setCalc({
      ...calc,
      num: calc.num * -1,
      res:
        calc.num === 0 && !isNaN(Number(calc.res)) ? calc.res * -1 : calc.res,
    });
  };

  const percent = () => {
    setCalc({
      ...calc,
      res: calc.res,
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

    if (calc.num !== 0) {
      setCalc({
        ...calc,
        res: calc.num === "0" && calc.sign === "/" ? "Undefined" : total,
        num:
          calc.res === 0 ||
          (calc.res === 0 && calc.sign === "X") ||
          (calc.res === 0 && calc.sign === "/")
            ? calc.num
            : 0,
        sign: "",
      });

      if (calc.num !== 0 && calc.sign.length === 1) return total;
    }
  };

  const arithmetics = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      res:
        calc.num === "0" && calc.sign === "/"
          ? "Undefined"
          : calc.num !== 0 && calc.sign.length === 1
          ? result()
          : calc.res === 0
          ? calc.num
          : calc.res,
      num: 0,
    });
  };

  return (
    <div className="calc-wrapper">
      <Screen res={calc.res === 0 || calc.num !== 0 ? calc.num : calc.res} />
      <div className="button-wrapper">
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? reset
                  : btn === "+-"
                  ? invert
                  : btn === "%"
                  ? percent
                  : btn === "="
                  ? result
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? arithmetics
                  : numClick
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;

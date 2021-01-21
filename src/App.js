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

  // invert and pls multiple times
  //pressing divide and equals

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

  function localeString(x, sep, grp) {
    var sx = ("" + x).split("."),
      s = "",
      i,
      j;
    sep || (sep = " "); // default seperator
    grp || grp === 0 || (grp = 3); // default grouping
    i = sx[0].length;
    while (i > grp) {
      j = i - grp;
      s = sep + sx[0].slice(j, i) + s;
      i = j;
    }
    s = sx[0].slice(0, i) + s;
    sx[0] = s;
    return sx.join(".");
  }

  const numClick = (e) => {
    const value = e.target.innerHTML;
    if (
      (calc.num === "0" && value === "0") || //avoid entering 00034
      (calc.num.toString().includes(".") && value === ".") || //avoid entering 0..34
      (calc.res !== 0 && calc.num === 0 && value === ".") //avoid adding comma in the result
    )
      return;

    if (calc.sign === "") {
      calc.res = 0; //reset after equal press
    }

    setCalc({
      ...calc,
      num:
        calc.num === 0 && value === "." // format to 0. if . pressed first
          ? "0."
          : calc.num !== 0 && value === "." // add comma for number
          ? calc.num + "."
          : localeString(
              (calc.num === 0
                ? value
                : calc.num === "0"
                ? value
                : (calc.num += value)
              ).replace(/\s/g, "")
            ),
      // res: isNaN(Number(calc.res)) || calc.sign === "" ? 0 : calc.res,
    });
  };

  const invert = () => {
    setCalc({
      ...calc,
      num:
        calc.num !== 0
          ? localeString(calc.num.replace(/\s/g, "") * -1)
          : calc.res !== 0
          ? localeString(calc.res.replace(/\s/g, "") * -1)
          : 0,
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
    const [conNum, conRes] = [
      Number(
        calc.sign !== "" && calc.num !== 0 ? calc.num.replace(/\s/g, "") : 0
      ),
      Number(calc.res !== 0 ? calc.res.replace(/\s/g, "") : 0),
    ];

    const math = (a, b, sign) =>
      sign === "+"
        ? a + b
        : sign === "-"
        ? a - b
        : sign === "X"
        ? a * b
        : a / b;

    const total = math(conRes, conNum, calc.sign);
    if (calc.sign !== "") {
      //to prevent repetitive equals press

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : localeString(total),
        num:
          calc.res === 0 ||
          (calc.res === 0 && calc.sign === "X") ||
          (calc.res === 0 && calc.sign === "/")
            ? calc.num
            : 0,
        sign: "",
      });
    }

    if (calc.num !== 0 && calc.sign.length === 1) return total;
  };

  const arithmetics = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      res:
        calc.res === 0 && calc.num !== 0
          ? localeString(calc.num.replace(/\s/g, ""))
          : calc.res !== 0 && calc.num !== 0 && calc.sign !== ""
          ? localeString(result()) //2+2+2 without equal
          : calc.res, //for repetitive arithmetic presses
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

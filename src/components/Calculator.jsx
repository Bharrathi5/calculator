import { useState } from "react";
import ButtonBox from "./ButtonBox";
import Display from "./Display";
import Theme from "./Theme";

const Calculator = () => {
  const [expression, setExpression] = useState([]);
  const [result, setResult] = useState("0");
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = (newTheme) => {
    setIsDark(newTheme);
  };

  const handleClick = (value, type) => {
    if (type === "number") handleNumber(value);
    if (type === "operator") handleOperator(value);
    if (type === "action") handleAction(value);
    if (type === "equal") handleEqual(value);
    if (type === "delete") handleDelete(value);
  };

  const handleNumber = (value) => {
    setExpression((prev) => {
      const lastItem = prev[prev.length - 1];
      if (
        typeof lastItem === "number" ||
        (typeof lastItem === "string" && !isNaN(lastItem))
      ) {
        if (value === "." && lastItem.toString().includes(".")) {
          return prev;
        }
        const updatedLastNumber = lastItem.toString() + value;
        return [...prev.slice(0, -1), updatedLastNumber];
      }
      if (value === ".") {
        return [...prev, "0."];
      }
      return [...prev, value];
    });
  };
  const handleOperator = (value) => {
    setExpression((prev) => {
      const lastItem = prev[prev.length - 1];
      if (["+", "-", "x", "÷"].includes(lastItem)) {
        return [...prev.slice(0, -1), value];
      }
      return [...prev, value];
    });
  };

  const handleAction = (value) => {
    if (value === "AC") {
      setExpression([]);
      setResult("0");
    } else if (value === "+/-") {
      toggleSign();
    } else if (value === "%") {
      applyPercentage();
    }
  };

  const handleEqual = () => {
    calculateResult();
  };

  const handleDelete = () => {
    applyDelete();
  };

  const toggleSign = () => {
    setExpression((prev) => {
      if (typeof prev[prev.length - 1] === "number") {
        const updatedLastNumber = prev[prev.length - 1] * -1;
        return [...prev.slice(0, -1), updatedLastNumber];
      }
      return prev;
    });
  };

  const applyPercentage = () => {
    setResult((res) => {
      const result = parseFloat(res);
      if (isNaN(result)) {
        return "0";
      }
      return (res / 100).toString();
    });
  };

  const applyDelete = () => {
    setExpression((exp) => exp.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      const modifiedExpression = expression
        .map((item) => (item === "x" ? "*" : item === "÷" ? "/" : item))
        .join(" ");
      const evalResult = eval(modifiedExpression);
      setResult(evalResult.toString());
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className={`calc ${isDark ? "dark" : "light"}`}>
      <Theme toggleTheme={toggleTheme} />
      <Display userInput={expression} result={result} />
      <ButtonBox handleButtonClick={handleClick} />
    </div>
  );
};

export default Calculator;

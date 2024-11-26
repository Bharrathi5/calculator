import { useCallback, useEffect, useState } from "react";
import ButtonBox from "./ButtonBox";
import Display from "./Display";
import Theme from "./Theme";
import { evaluate } from "mathjs";

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
      if (lastItem === 0 || lastItem === "0") {
        return [...prev.slice(0, -1), parseFloat(value)];
      }
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
    setExpression([]);
    calculateResult();
  };

  const handleDelete = () => {
    applyDelete();
  };

  const toggleSign = () => {
    setExpression((prev) => {
      const lastElement = prev[prev.length - 1];
      if (!isNaN(lastElement)) {
        const updatedLastNumber = lastElement * -1;
        return [...prev.slice(0, prev.length - 1), updatedLastNumber];
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

  const calculateResult = useCallback(() => {
    try {
      const modifiedExpression = expression
        .map((item) => (item === "x" ? "*" : item === "÷" ? "/" : item))
        .join(" ");
      const evalResult = evaluate(modifiedExpression);
      return evalResult.toString();
    } catch {
      setResult("Error");
    }
  }, [expression]);

  useEffect(() => {
    if (expression.length > 0) {
      const calculated = calculateResult(expression);
      setResult(calculated);
    } else {
      setResult("0");
    }
  }, [expression, calculateResult]);

  return (
    <div className={`calc ${isDark ? "dark" : "light"}`}>
      <Theme toggleTheme={toggleTheme} />
      <Display userInput={expression} result={result} />
      <ButtonBox handleButtonClick={handleClick} />
    </div>
  );
};

export default Calculator;

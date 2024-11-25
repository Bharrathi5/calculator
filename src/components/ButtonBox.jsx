import Button from "./Button";


const ButtonBox = ({handleButtonClick}) => {
  const buttons = [
    { value: "AC", type: "action" },
    { value: "+/-", type: "action" },
    { value: "%", type: "action" },
    { value: "÷", type: "operator" },
    { value: "7", type: "number" },
    { value: "8", type: "number" },
    { value: "9", type: "number" },
    { value: "x", type: "operator" },
    { value: "4", type: "number" },
    { value: "5", type: "number" },
    { value: "6", type: "number" },
    { value: "-", type: "operator" },
    { value: "1", type: "number" },
    { value: "2", type: "number" },
    { value: "3", type: "number" },
    { value: "+", type: "operator" },
    { value: "Prev", type: "action" },
    { value: "0", type: "number" },
    { value: ".", type: "number" },
    { value: "=", type: "operator" },
  ];
  return (
    <div className="button-box">
      {buttons.map((btn)=>(
       <Button key={btn.value} type={btn.type} value={btn.value} onClick={handleButtonClick}/>))}
    </div>
  )
}

export default ButtonBox
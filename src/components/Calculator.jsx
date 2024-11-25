import { useState } from "react"
import ButtonBox from "./ButtonBox"
import Display from "./Display"
import Theme from "./Theme"


const Calculator = () => {
    const [expression, setExpression]=useState("");
    const [result, setResult]=useState("");
    const handleClick = ()=>{
        //logic
    }
  return (
    <div>
        <Theme/>
        <Display userInput={expression} result={result}/>
        <ButtonBox handleButtonClick={handleClick}/>
    </div>
  )
}

export default Calculator


const Display = ({userInput, result}) => {
  return (
    <div className="display">
      <input type="text" value={userInput}readOnly/>
      <input type="text" value={result}readOnly/>
    </div>
  )
}

export default Display
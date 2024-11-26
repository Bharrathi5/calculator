const Display = ({ userInput, result }) => {
  return (
    <div className="display">
      <input
        className="user-input"
        value={userInput.length > 0 ? userInput.join(" ") : ""}
        readOnly
      />
      <input className="result" value={result} readOnly />
    </div>
  );
};

export default Display;

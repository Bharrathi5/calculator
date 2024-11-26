const Display = ({ userInput, result }) => {
  return (
    <div className="display">
      <div className="user-input">{userInput}</div>
      <div className="result">{result}</div>
    </div>
  );
};

export default Display;

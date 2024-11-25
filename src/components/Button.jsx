


const Button = ({type, value, onClick}) => {
  return (
    <div>
        <button className={`button ${type}`} onClick={onClick}>{value}</button>
    </div>
  )
}

export default Button
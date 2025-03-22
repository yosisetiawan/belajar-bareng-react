function MyButton ({text, onClick}){
    return (
        <>
        <button className="btn" onClick={onClick}>
            {text}</button>
        </>
    )
}
export default MyButton
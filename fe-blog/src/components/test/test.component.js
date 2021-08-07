const Test = (props) => {
    return (
    <div className={props.className}>
        {props.children}
        <p>This is a test</p>
    </div>    
    )
};

export default Test;
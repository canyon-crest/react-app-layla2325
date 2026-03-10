function Message(props) {
    return (
        <div>
            <h2>{props.text}</h2>
            <p>{props.name}</p>
        </div>
    );
}

export default Message;
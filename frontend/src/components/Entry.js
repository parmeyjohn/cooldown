
const Entry = ({ entry }) => {

    return(
        <div>
            <h2>{entry.entryTitle}</h2>
            <h3>{entry.mediaTitle} on {entry.date}</h3>
            <p>{entry.text}</p>
        </div>
    )
}

export default Entry
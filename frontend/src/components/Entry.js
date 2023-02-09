
const Entry = ({ entry }) => {
    var shortDate = new Date(entry.date)
    shortDate = shortDate.toDateString()
    return(
        <div>
            <h2>{entry.entryTitle}</h2>
            <h3>{entry.mediaTitle} on {shortDate}</h3>
            <p>{entry.text}</p>
        </div>
    )
}

export default Entry
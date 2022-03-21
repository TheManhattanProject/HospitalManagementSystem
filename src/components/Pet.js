export default function Pet(props) {
    return (
    <div className="petCard">
        <h3>{props.pet.name}</h3>
        <p>Species: {props.pet.species}</p>
        <a href={`/patient/history?id=${props.pet._id}`}>View History</a>
    </div>)
}
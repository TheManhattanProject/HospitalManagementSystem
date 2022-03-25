import './styles/Pet.css';

export default function Pet(props) {
    console.log(props);
    return (
    <div className="petCard">
        <h3>{props.pet.name}</h3>
        <img src={props.pet.profile} alt={props.pet.name} />
        <p>Species: {props.pet.species}</p>
        <a href={`/patient/history?id=${props.pet._id}`}>View History</a>
    </div>)
}
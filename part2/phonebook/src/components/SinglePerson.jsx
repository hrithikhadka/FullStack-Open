//Single Person
const Person = ({ person, deletePersonDetails }) => {
  return (
    <li>
      {person.name}
      {person.number}
      <button onClick={() => deletePersonDetails(person.id)}>delete</button>
    </li>
  );
};

export default Person;

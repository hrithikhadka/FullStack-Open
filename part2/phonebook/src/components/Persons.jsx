import Person from "./SinglePerson";
const Persons = ({ persons, filterByName, deletePersonDetails }) => {
  return (
    <ul>
      {filterByName.length > 0
        ? filterByName.map((person) => (
            <Person
              key={person.id}
              person={person}
              deletePersonDetails={deletePersonDetails}
            />
          ))
        : persons.map((person) => (
            <Person
              key={person.id}
              person={person}
              deletePersonDetails={deletePersonDetails}
            />
          ))}
    </ul>
  );
};

export default Persons;

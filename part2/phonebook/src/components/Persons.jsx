import Person from "./SinglePerson";
const Persons = ({ persons, filterByName }) => {
  return (
    <ul>
      {filterByName.length > 0
        ? filterByName.map((person) => (
            <Person key={person.name} person={person} />
          ))
        : persons.map((person) => <Person key={person.name} person={person} />)}
    </ul>
  );
};

export default Persons;

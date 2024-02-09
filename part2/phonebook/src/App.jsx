import { useState, useEffect } from "react";
import axios from "axios";

//Filter
const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shown wtih <input onChange={handleFilter} />
    </div>
  );
};

//PersonForm
const PersonForm = ({
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
  addNewPerson,
}) => {
  return (
    <form onSubmit={addNewPerson}>
      <h2>add a new</h2>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

//Single Person
const Person = ({ person }) => {
  return (
    <li>
      {person.name}
      {person.number}
    </li>
  );
};

//persons component
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

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterByName, setFilterByName] = useState([]);

  const handleNewName = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value);
  };

  const addNewPerson = (e) => {
    e.preventDefault();
    const checkName = persons.some((person) => person.name === newName);
    if (checkName) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (event) => {
    const value = event.target.value;
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilterByName(filtered);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      // console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter} />

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>

      <Persons persons={persons} filterByName={filterByName} />
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

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
      const newPerson = { name: newName, number: newNumber };
      //make POST request to the server endpoint with newPerson data
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          setPersons([...persons, response.data]);
        });
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

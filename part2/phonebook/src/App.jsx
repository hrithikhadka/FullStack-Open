import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";
import axios from "axios";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterByName, setFilterByName] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((response) => {
      // console.log(response.data);
      setPersons(response);
    });
  }, []);

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

    //get person object with matching user input name
    const personObj = persons.find((person) => person.name === newName);

    if (personObj) {
      const userConfirm = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (userConfirm) {
        //updating the phone number if user confirms ok
        const updatedPhonebook = persons.map((person) =>
          person.name === newName ? { ...person, number: newNumber } : person
        );
        const newPersonObj = { ...personObj, number: newNumber };
        phonebookService
          .updatePerson(personObj.id, newPersonObj)
          .then(() => {
            setPersons(updatedPhonebook);
            setSuccessMessage(`Updated ${personObj.name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log("Error updating person");
            alert();
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      //make POST request to the server endpoint with newPerson data
      phonebookService
        .create(newPerson)
        .then((response) => {
          setPersons([...persons, response]);
          setSuccessMessage(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
          console.log(response);
        })
        .catch((error) => {
          console.log("Error creating a new Person");
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePersonDetails = (id) => {
    //console.log("person details of " + id + " needs to be deleted!!");
    //get person object with matching id
    const getPersonObj = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${getPersonObj.name}?`)) {
      phonebookService.deletePersonDetail(id).then(() => {
        console.log("Person with id " + id + " is deleted from phonebook ");
        // console.log("Server Response:", response);
        setPersons(persons.filter((person) => person.id !== id));
      });
    } else {
      console.log("unsuccessful!");
    }
  };

  const handleFilter = (event) => {
    const value = event.target.value;
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilterByName(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification success={successMessage} />

      <Filter handleFilter={handleFilter} />

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>

      <Persons
        persons={persons}
        filterByName={filterByName}
        deletePersonDetails={deletePersonDetails}
      />
    </div>
  );
};

export default App;

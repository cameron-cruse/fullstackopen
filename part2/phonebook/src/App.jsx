import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Person from "./components/Person";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    console.log("fetching");
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const destroyPerson = (id) => {
    console.log(`destroying ${id}`);
  };

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const exists = persons.some((person) => person.name === newName);

    if (exists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      {/* <Persons persons={persons} destroyPerson={() => destroyPerson()} /> */}
      <>
        {persons.map((person) => (
          <Person
            key={person.name}
            name={person.name}
            number={person.number}
            destroyThisPerson={() => destroyPerson(person.id)}
          />
        ))}
      </>
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
// import Persons from "./components/Persons";
import Person from "./components/Person";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [messageType, setMessageType] = useState(true);

  useEffect(() => {
    console.log("fetching");
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const destroyPerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      console.log(`destroying ${id}`);
      personService.destroy(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const exists = persons.some((person) => person.name === newName);

    if (exists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const oldPerson = persons.find((p) => p.name === newName);
        personService
          .update(oldPerson.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name === returnedPerson.name ? returnedPerson : person
              )
            );
          })
          .catch((error) => {
            setMessageType(false);
            setMessage(
              `${oldPerson.name} has already been removed from the server!`
            );
            setTimeout(() => setMessage(null), 5000);
            setPersons(persons.filter((n) => n.id !== oldPerson.id));
          });
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessageType(true);
        setMessage(`Successfully added ${returnedPerson.name} to phonebook!`);
        setTimeout(() => setMessage(null), 5000);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
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

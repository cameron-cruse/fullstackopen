/* eslint-disable react/prop-types */

import Person from "./Person";
const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person, destroyPerson) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          destroyPerson={() => destroyPerson(person.id)}
        />
      ))}
    </>
  );
};

export default Persons;

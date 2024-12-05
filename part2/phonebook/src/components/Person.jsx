/* eslint-disable react/prop-types */
const Person = ({ name, number, destroyThisPerson }) => {
  return (
    <p>
      {name} {number} <button onClick={destroyThisPerson}>delete</button>
    </p>
  );
};

export default Person;

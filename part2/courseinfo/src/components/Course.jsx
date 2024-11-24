const Header = ({ course }) => <h1>{course.name}</h1>;
const Total = ({ sum }) => <p>Number of exercises {sum}</p>;
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </>
);
const Course = ({ course }) => {
  const sum = course.parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  );
};

export default Course;

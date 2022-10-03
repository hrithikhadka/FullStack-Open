import React from "react";

const Total = ({ parts }) => {
  // console.log(parts);
  var total = parts.reduce((accum, item) => accum + item.exercises, 0);
  return (
    <>
      <p>
        <strong>total of {total} exercises</strong>{" "}
      </p>
    </>
  );
};
const Part = ({ part }) => {
  // console.log(part);
  return (
    <>
      <div>
        <p>
          {part.name} {""}
          {part.exercises}
        </p>
      </div>
    </>
  );
};
const Content = ({ parts }) => {
  // console.log(parts);
  return (
    <>
      <div>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    </>
  );
};

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Course = ({ course }) => {
  // console.log(course);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;

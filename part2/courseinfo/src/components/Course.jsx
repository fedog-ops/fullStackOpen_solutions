import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>
const Total = ({sum}) => {
    const total = sum.reduce((s, p) => s + p.exercises,0)
    return <h3>Number of exercises {total}</h3>
}

const Content = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>

function Course({course}) {
  return (
    <>
        <Header course={course.name} />

        {course.parts.map(part => 
           <Content part={part} key={part.id}/>
        )}
        <Total sum={course.parts} />
    </>
  )
}

export default Course
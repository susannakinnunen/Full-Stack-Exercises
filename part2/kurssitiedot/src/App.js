const Total = ({ total }) => {
  return (
    <div>
    <p>total of {total} exercises</p>
    </div>
  )
}


const Part = ({ part }) => {
  return (
    <div>
    <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({ courseParts }) => {
  console.log("courseparts",courseParts)
  const totalList = courseParts.map(part => part.exercises)
  const total = totalList.reduce((cumulative, currentValue) => cumulative + currentValue, 0)
    return (
      <div>
        {courseParts.map(part =>
          <Part key={part.id} part={part} />
        )}
      <Total total={total}/>

      </div>
  )
}


const Header = ({ courseName }) => {
  console.log(courseName)
  return (
    <div>
      <h1>
        {courseName}
      </h1>

    </div>
  )
}

const Course = ({ course }) => {
  console.log(course.name)
  return (
    <div>
      <Header courseName={course.name} />
      <Content courseParts={course.parts} />
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course =>
        <Course key={course.id} course={course} />
        )}
    </div>
  )
}

export default App
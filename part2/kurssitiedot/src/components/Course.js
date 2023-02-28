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

  export default Course
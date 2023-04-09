import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({filter, handleFilter}) => {
  return(
  <div>
    <p>filter shown with</p><input type="text" value={filter} onChange={handleFilter}/>
  </div>
  )
}

const PersonForm = (props) => {
  return(
    <div>
      <form onSubmit={props.addNameAndNumber}>
      <div>
          name: <input value={props.newName} onChange={props.handleNameAdd}/>
          </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberAdd}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
    

  )
  }

const Persons = (props) => {
  return(
    <div>
      {props.personsToShow.map(person => 
      <p key={person.name}>
      {person.name} {person.number} <button onClick={() => props.handleDelete(person.id)}>delete</button></p>

       )}

    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [isFilter, setisFilter] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
      .then(initialPeople => {
        console.log('promise fulfilled')
        setPersons(initialPeople)
      })
  }, [])

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, number: newNumber.toString()
    }
    if (persons.find(person => person.name === newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const previousPerson = persons.find(person => person.name === newName)
        const updatedPerson = {...previousPerson, number: newNumber}
        personService
        .update(updatedPerson.id, updatedPerson)
        .then(returnedPerson => {
          console.log('returnedperson', returnedPerson)
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Updated ${newName}'s number`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
      })
      .catch(error => {
        setErrorMessage(` Information of ${newName} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      })
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        console.log('returnedperson', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log("error",error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameAdd = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    if (event.target.value === ''){
      setFilter(event.target.value)
      setisFilter(false)
    }
  else{
    setFilter(event.target.value)
    setisFilter(true)
  }
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name}?`)){
    personService
    .deleteName(id)
    setPersons(persons.filter(person => person.id !== id))
    setSuccessMessage(`Deleted ${person.name}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    }
  }

  const personsToShow = isFilter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter filter={filter} handleFilter={handleFilter}/>

      <h2>add new</h2>
      <PersonForm newName={newName} handleNameAdd={handleNameAdd} newNumber={newNumber} handleNumberAdd={handleNumberAdd} addNameAndNumber={addNameAndNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
        
    </div>
  )

}

export default App
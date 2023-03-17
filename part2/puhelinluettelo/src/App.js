import { useState, useEffect } from 'react'
import axios from 'axios'
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
      {person.name} {person.number}</p>
       )}

    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [isFilter, setisFilter] = useState(false)

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
      setNewName('')
      setNewNumber('')
      alert(`${newName} is already added to phonebook`)
    }
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
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


  const personsToShow = isFilter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>

      <h2>add new</h2>
      <PersonForm newName={newName} handleNameAdd={handleNameAdd} newNumber={newNumber} handleNumberAdd={handleNumberAdd} addNameAndNumber={addNameAndNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
        
    </div>
  )

}

export default App
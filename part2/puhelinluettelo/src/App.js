import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [isFilter, setisFilter] = useState(false)

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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      <div>
        <p>filter shown with</p><input type="text" value={filter} onChange={handleFilter}/>
      </div>
      <h2>add new</h2>
      <form onSubmit={addNameAndNumber}>
      <div>
          name: <input value={newName} onChange={handleNameAdd}/>
          </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberAdd}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      <div>
      {personsToShow.map(person => 
      <p key={person.name}>
      {person.name} {person.number}</p>
       )}
      </div>
        
    </div>
  )

}

export default App
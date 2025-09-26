import { useState, useEffect } from 'react'
import numberService from './services/numbers'

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const SearchBar = ({ nameFilter, handleNameFilter }) => {
  return (
    <form>
      <div>
        filter shown with <input value={nameFilter} onChange={handleNameFilter}/>
      </div>
    </form>
  )
}

const AddPerson = ({ newName, newNumber, handleNameChange, handleNumberChange, addName }) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const People = ({ peopleToShow }) => {
  return (
    <>
      <h2>Numbers</h2>
      {peopleToShow.map((person) => <Person key={person.id} person={person} />)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    numberService
      .getAll()
      .then(initialNumbers => 
        setPersons(initialNumbers)
      )
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.filter(person => person.name === newName).length >= 1) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      numberService
        .create(nameObject)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const peopleToShow = persons.filter(person => 
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar nameFilter={nameFilter} handleNameFilter={handleNameFilter}/>
      <AddPerson 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <People peopleToShow={peopleToShow}/>
    </div>
  )
}

export default App
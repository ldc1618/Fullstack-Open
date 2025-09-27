import { useState, useEffect } from 'react'
import numberService from './services/numbers'
import { SearchBar, AddPerson, People } from './components/Numbers'

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

  const deleteNumber = (person) => {
    const proceed = confirm(`Delete ${person.name}`)

    if (proceed) {
      numberService
        .remove(person.id)
        .then(returnedNumber => {
          setPersons(persons.filter(p => p.id != returnedNumber.id))
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
      <People peopleToShow={peopleToShow} deleteNumber={deleteNumber}/>
    </div>
  )
}

export default App
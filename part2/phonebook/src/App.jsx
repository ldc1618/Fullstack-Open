import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import numberService from './services/numbers'
import { SearchBar, AddPerson, People } from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

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
      const update = 
        confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (update) {
        updateNumber({ ...persons.find(p => p.name === newName), number: newNumber })
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      numberService
        .create(nameObject)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
          setNewName('')
          setNewNumber('')

          setIsError(false)
          setMessage(
            `Added ${returnedNumber.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
        .catch(error => {
          setIsError(true)
          setMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const updateNumber = (person) => {
    numberService
      .update(person.id, person)
      .then(returnedNumber => {
        setPersons(persons.map(p => 
          p.id === person.id ? returnedNumber : p
        ))
        setNewName('')
        setNewNumber('')

        setIsError(false)
        setMessage(
          `Updated ${returnedNumber.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setIsError(true)
        setMessage(
          `Information of ${person.name} has already been removed from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
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
      <Notification message={message} error={isError} />
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
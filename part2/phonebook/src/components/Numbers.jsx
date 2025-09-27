const Person = ({ person, deleteNumber }) => {
  return (
    <li>
      {`${person.name} ${person.number} `}
      <button onClick={() => deleteNumber(person)}>delete</button>
    </li>
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

const People = ({ peopleToShow, deleteNumber }) => {
  return (
    <>
      <h2>Numbers</h2>
      {peopleToShow.map((person) => 
        <Person 
          key={person.id}
          person={person}
          deleteNumber={deleteNumber}/>
      )}
    </>
  )
}

export { SearchBar, AddPerson, People }
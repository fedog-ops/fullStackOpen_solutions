import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNoteChange = (event) => {
  setNewName(event.target.value)
}
  const addName = (event) => {
      event.preventDefault()
      const personsObject ={
        name: newName,
      }

   setPersons(persons.concat(personsObject))
   setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(x=><p>{x.name}</p>)}
    </div>
  )
}

export default App
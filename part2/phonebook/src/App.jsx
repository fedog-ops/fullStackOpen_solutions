import { useState } from 'react'

const Contact = ({params}) => {
 return <p>{params.name} {params.number}</p>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,
    number: 12345678809,
    id : 1},
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNoteChange = (event) => {
  setNewName(event.target.value)
}
const handleNumChange = (event) => {
  setNewNumber(event.target.value)
}
  const addName = (event) => {
      event.preventDefault()
   
      const personsObject ={
        name: newName,
        number: newNumber,
        id: persons.length +1,
      }
    if (persons.some(m => m.name === personsObject.name)) alert(`${newName} is already added to phonebook`)
    if (!newName) alert('Please enter a name')
    else setPersons(persons.concat(personsObject))
   setNewName('')
   setNewNumber('')
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
        <div>number: <input 
            value={newNumber}
            onChange={handleNumChange}
        /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      {persons.map(x => <Contact key={x.id} params={x}/>)}
    </div>
  )
}

export default App
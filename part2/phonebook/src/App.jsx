import { useState } from 'react'

const Contact = ({params}) => {
 return <p>{params.name} {params.number}</p>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: 12345678809, id : 1},    
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFiler] = useState('')

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
  const personsAfterFilter = 
    filter === ''  ? persons : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={(e)=>setFiler(e.target.value)}/>
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
      {personsAfterFilter.map(x => {
      return <Contact key={x.id} params={x}/> 
    })}
    </div>
  )
}

export default App
import Filter from '../src/components/Filter'
import PersonForm from '../src/components/PersonForm'
import Persons from '../src/components/Persons'
import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFiler] = useState('')

  const handleNoteChange = (event) => {
  setNewName(event.target.value)
}
const handleNumChange = (event) => {
  setNewNumber(event.target.value)
}
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const deleteFnOf = (id) => {
    const nameToDelete = persons.find(person => person.id === id).name
    const confirmDelete = window.confirm(`Are you sure you want to delete user ${nameToDelete}?`);
    if (confirmDelete) {
      personService
      .remove(id)
      .then(response=>{
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }


  const addName = (event) => {
      event.preventDefault()
   
      const personsObject ={
        name: newName,
        number: newNumber,
      }
    if (persons.some(m => m.name === personsObject.name)) alert(`${newName} is already added to phonebook`)
    if (!newName) alert('Please enter a name')
    else personService
            .create(personsObject)
            .then(returnedPerson => {
              console.log(returnedPerson) 
              // db will assaign Object a new id
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
            })
  }
  const personsAfterFilter = 
    filter === ''  ? persons : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter params={{filter, setFiler}}/>
      <PersonForm 
      params = {{addName, newName, handleNoteChange,newNumber, handleNumChange}}
      />
      
      <h2>Numbers</h2>
      <ul>
        {personsAfterFilter.map(person => 
          <Persons
            key={person.id}
            person={person} 
            deleteFn={() => deleteFnOf(person.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App
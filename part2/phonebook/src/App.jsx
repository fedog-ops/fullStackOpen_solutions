import Filter from '../src/components/Filter'
import Notification from './components/Notification'
import PersonForm from '../src/components/PersonForm'
import Persons from '../src/components/Persons'
import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFiler] = useState('')
  const [message, setMessage] = useState({text: null, type: 'prompt'})

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
        resetFormFields();
        showMessage(`User deleted.`, 'prompt');
      })
      .catch(error => {
        showMessage(`User already deleted`, 'error');
      });
    }
  }

  const resetFormFields = () => {
    setNewName('');
    setNewNumber('');
};

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: null, type: 'prompt' }), 5000);
  };

  const updatePerson = (id, personsObject) => {
    personService
      .update(id, personsObject)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id).concat(returnedPerson));
        resetFormFields();
        showMessage(`${returnedPerson.name}'s number was updated.`, 'prompt');
      })
      .catch(error => {
        showMessage(`Information of ${personsObject.name} has already been removed from server`, 'error');
        setPersons(persons.filter(p => p.id !== id));
      });
  };

  const addNewPerson = (personsObject) => {
    personService
      .create(personsObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        resetFormFields();
        showMessage(`${returnedPerson.name}'s number was added.`, 'prompt');
      })
      .catch(error => {
        showMessage(`Failed to add ${personsObject.name}'s number.`, 'error');
      });
  };

  const addName = (event) => {
      event.preventDefault()
   
      const personsObject ={
        name: newName,
        number: newNumber,
      } 
      
      if (!newName) {
        alert('Please enter a name')
        return
      }
  
      if (persons.some(m => m.name === personsObject.name)) {
        const confirmUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
        
        if (confirmUpdate) {
         const id = persons.find(item => item.name === newName).id;
         updatePerson(id, personsObject);
        }
       
      }
       else addNewPerson(personsObject);
  }
  const personsAfterFilter = 
    filter === ''  ? persons : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase()))
   

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
      className={message.type}
      message={message.text}/>
      
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
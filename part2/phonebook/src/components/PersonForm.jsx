import React from 'react'

function PersonForm({params}) {
  
    const {addName, newName, handleNoteChange,newNumber, handleNumChange} = params
    return (
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
    
  )
}

export default PersonForm
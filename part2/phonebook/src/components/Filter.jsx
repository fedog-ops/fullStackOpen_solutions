import React from 'react'

function Filter({params}) {
    const {filter, setFiler} = params
  return (<div>
    filter shown with <input value={filter} onChange={(e)=>setFiler(e.target.value)}/>
  </div>)
}

export default Filter
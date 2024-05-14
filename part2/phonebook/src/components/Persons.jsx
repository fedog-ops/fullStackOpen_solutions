import React from 'react'

function Persons({ person, deleteFn}) {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={()=>deleteFn()}>delete</button>
        </div>
    );
}

export default Persons
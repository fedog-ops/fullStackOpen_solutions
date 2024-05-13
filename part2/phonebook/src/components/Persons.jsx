import React from 'react'

const Contact = ({params}) => {
    return <p>{params.name} {params.number}</p>
   }

function Persons({personsAfterFilter}) {
    return (
        <div>
            {personsAfterFilter.map(x => (
                <Contact key={x.id} params={x} />
            ))}
        </div>
    );
}

export default Persons
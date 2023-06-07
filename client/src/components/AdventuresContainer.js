import React from 'react'

function AdventuresContainer({adventures}) {

    const userAdventures = adventures.map((adventure) => {return <p>{adventure.attraction.name}</p>})

  return (
    <div>
        {userAdventures}
    </div>
  )
}

export default AdventuresContainer
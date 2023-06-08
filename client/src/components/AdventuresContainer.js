import React from 'react'
import AdventuresCard from './AdventuresCard'

function AdventuresContainer({adventures, setUserAdventures}) {

    function onAdventureDelete(id) {
        const filteredList = adventures.filter((adventure) => {
          return adventure.id !== id
        })
      
        setUserAdventures(filteredList)
      }

    const userAdventures = adventures.map((adventure) => {
      if (!adventure.ridden) {
        return <AdventuresCard adventure={adventure} onAdventureDelete={onAdventureDelete}/>
      }
    })

  return (
    <div>
        {userAdventures}
    </div>
  )
}

export default AdventuresContainer
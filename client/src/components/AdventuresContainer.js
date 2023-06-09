import React from 'react'
import AdventuresCard from './AdventuresCard'
import './adventureCard.css'

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
    <div className="adventuresContainer">
        {userAdventures.length > 0 ? userAdventures : <h1 className="emptyAdventure">You currently have no planned adventures!</h1>}
    </div>
  )
}

export default AdventuresContainer
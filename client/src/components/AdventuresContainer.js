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

    const userAdventures = adventures.filter((adventure) => {
        return !adventure.ridden
      }
    )
    console.log(userAdventures)
    
    const adventureCards = userAdventures.map((adventure) => {
      return <AdventuresCard adventure={adventure} onAdventureDelete={onAdventureDelete}/>
    })

    console.log(adventureCards)
  return (
    <div className="adventuresContainer">
        {adventureCards.length > 0 ? adventureCards : 
        <div>
          <h1 className="emptyAdventure">You currently have no planned adventures!</h1>
          <div className="noCardContainer">
            <img src="https://sf-static.sixflags.com/wp-content/uploads/2020/04/default_app-ride-kid_36-1.jpg" alt="Go add some adventures!" />
          </div>
        </div>
        }
    </div>
  )
}

export default AdventuresContainer
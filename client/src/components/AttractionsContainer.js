import React from 'react'
import AttractionCard from './AttractionCard'
import './attractionCard.css'

function AttractionsContainer({ filteredList, setUserAdventures, adventures}) {
  
const attractionsToRender = filteredList.map((attraction) => {
  return <AttractionCard key={attraction.id} attraction={attraction} setUserAdventures={setUserAdventures} adventures={adventures}/>
})

  return (
    <div className="attractionContainer">
      {attractionsToRender}
    </div>
  )
}

export default AttractionsContainer
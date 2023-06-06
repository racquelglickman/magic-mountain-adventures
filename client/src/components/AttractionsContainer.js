import React from 'react'
import AttractionCard from './AttractionCard'
import './attractionCard.css'

function AttractionsContainer({ attractions }) {
  
const attractionsToRender = attractions.map((attraction) => {
  return <AttractionCard key={attraction.id} attraction={attraction} />
})

  return (
    <div className="attractionContainer">
      {attractionsToRender}
    </div>
  )
}

export default AttractionsContainer
import React from 'react'
import AttractionCard from './AttractionCard'

function AttractionsContainer({ attractions }) {
  
const attractionsToRender = attractions.map((attraction) => {
  return <AttractionCard key={attraction.id} attraction={attraction} />
})

  return (
    <div>
      {attractionsToRender}
    </div>
  )
}

export default AttractionsContainer
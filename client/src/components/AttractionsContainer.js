import React from 'react'
import AttractionCard from './AttractionCard'

function AttractionsContainer({ filteredList }) {
  
const attractionsToRender = filteredList.map((attraction) => {
  return <AttractionCard key={attraction.id} attraction={attraction} />
})

  return (
    <div>
      {attractionsToRender}
    </div>
  )
}

export default AttractionsContainer
import React, { useContext, useState } from 'react'
import Search from './Search'
import AttactionsContainer from './AttractionsContainer'
import { MyContext } from './MyProvider'
import ToggleSwitch from './ToggleSwitch'

function Home() {

  const { attractions, user } = useContext(MyContext)
  
  //handles filter of attractions
  const [attractionSearch, setAttractionSearch] = useState('')

  function handleSearch(target) {
    setAttractionSearch(target)
  }
  
  const filteredList = attractions.filter((attraction => {
    return attraction.name.toLowerCase().includes(attractionSearch.toLowerCase())
  }))

  //toggles attractions or adventures
  const [toggleAdventures, setToggleAdventures] = useState(false)

  function handleToggle() {
    setToggleAdventures(!toggleAdventures)
  }

  return (
    <div>
      <ToggleSwitch label=' ' handleToggle={handleToggle}/>
      {toggleAdventures ? null : <Search attractionSearch={attractionSearch} handleSearch={handleSearch} />}
      {toggleAdventures ? 'Adventures Placeholder' : <AttactionsContainer attractions={attractions} filteredList={filteredList} />}
    </div>
  )
}

export default Home
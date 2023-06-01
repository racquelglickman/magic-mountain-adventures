import React, { useContext, useState, useEffect } from 'react'
import Search from './Search'
import AttactionsContainer from './AttractionsContainer'
import { MyContext } from './MyProvider'
import ToggleSwitch from './ToggleSwitch'
import AdventuresContainer from './AdventuresContainer'

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

  // fetches user adventures

  const [userAdventures, setUserAdventures] = useState([])

  
  useEffect(() => {
    fetch(`/adventures/user/${user.id}`)
    .then(r => r.json())
    .then(data => {
      setUserAdventures(data)
      console.log(data)})
  }, [])

  return (
    <div>
      <ToggleSwitch label=' ' handleToggle={handleToggle}/>
      {toggleAdventures ? null : <Search attractionSearch={attractionSearch} handleSearch={handleSearch} />}
      {toggleAdventures ? <AdventuresContainer adventures={userAdventures}/> : <AttactionsContainer attractions={attractions} filteredList={filteredList} setUserAdventures={setUserAdventures} adventures={userAdventures}/>}
    </div>
  )
}

export default Home
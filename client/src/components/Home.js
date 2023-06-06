import React, { useContext } from 'react'
import Search from './Search'
import AttactionsContainer from './AttractionsContainer'
import { MyContext } from './MyProvider'

function Home() {

  const { attractions } = useContext(MyContext)

  return (
    <div>
        <Search />
        <AttactionsContainer attractions={attractions}/>
    </div>
  )
}

export default Home
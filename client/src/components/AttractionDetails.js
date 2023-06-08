import React, { useState, useContext } from 'react'
import { useLocation } from "react-router-dom"
import { MyContext } from './MyProvider';


function AttractionDetails() {
  const location = useLocation()
  const attraction = location.state

  console.log(attraction)

  const { user } = useContext(MyContext)

  const description_paragraphs = Object.values(attraction.description).map((paragraph) => {
    return <p>{paragraph}</p>
  })

  function handleClick(e) {
    console.log(e)

    console.log('location', location)
    console.log('user', user)

    fetch('/adventures', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.id,
        attraction_id: attraction.id
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
    })
  }

  return (
    <div>
      <h1>{attraction.name}</h1>
      <img src={attraction.thumbnail ? attraction.thumbnail : null} alt={attraction.name} />
      <h3>Attraction Type: {attraction.type}</h3>
      <h3>Thrill Level: {attraction.thrill_level}</h3>
      {attraction.height_req > 0 ? <p>Minimum Height Required: {attraction.height_req} inches</p>: 
      <p>Minimum Height Required:  None</p>}
      {attraction.avg_wait ? <p>Average Wait Time: {attraction.avg_wait}</p> : 
      <p>Average Wait Time: N/A</p>}
      {attraction.avg_rating ? <p>Average User Rating: {attraction.avg_rating}</p> : 
      <p>Average User Rating: N/A</p>}
      
      <div>
        {description_paragraphs ? description_paragraphs : <p>DESCRIPTION GOES HERE</p>}
      </div>
      
      
      <button onClick={handleClick} >Add to Adventures</button>
    </div>
  )
}

export default AttractionDetails
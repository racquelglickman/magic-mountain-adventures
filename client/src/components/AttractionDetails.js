import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { MyContext } from './MyProvider';
import './detailPage.css'


function AttractionDetails() {
  const location = useLocation()
  // const attraction = location.state

  const [attraction, setAttraction] = useState(location.state)

  useEffect(() => {
    fetch(`/attractions/${location.state.id}`)
    .then(r => r.json())
    .then(data => setAttraction(data))
  }, [])

  const { user } = useContext(MyContext)

  const description_paragraphs = Object.values(attraction.description).map((paragraph) => {
    return <p>{paragraph}</p>
  })

  const getThrillLevelClass = () => {
    switch (attraction.thrill_level) {
      case 'Mild':
        return 'glow mild';
      case 'Moderate':
        return 'glow moderate';
      case 'Maximum':
        return 'glow maximum';
      default:
        return 'glow';
    }
  };

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
    <div className="detailPageContainer">
      <div className='divContainer'>
      <div className = "imgContainer">
      <img className="detailsImg" src={attraction.thumbnail ? attraction.thumbnail : null} alt={attraction.name}/></div>
      <div className="detailsContainer">
      <h1 className="detailsName">{attraction.name}</h1>
      <p className="detailsType">Attraction Type: <span className="output">{attraction.type}</span></p>
      <p className='detailsThrill'>Thrill Level:{' '}
              <span className={`glow ${getThrillLevelClass()}`}>{attraction.thrill_level}</span>
            </p>
      {attraction.height_req > 0 ? <p className="heightReq" >Minimum Height Required: <span className="output">{attraction.height_req} inches</span></p>: 
      <p className="heightReq">Minimum Height Required: <span className="output"> None</span></p>}
      {attraction.avg_wait ? <p><span className="heightReq">Average Wait Time:</span> {attraction.avg_wait} minutes</p> : 
      <p>Average Wait Time: N/A</p>}
      {attraction.avg_rating ? <p><span className="heightReq">Average User Rating:</span> {attraction.avg_rating} / 5.0</p> : 
      <p>Average User Rating: N/A</p>}
      
      <div className="detailsDescription">
        {description_paragraphs ? description_paragraphs : <p>DESCRIPTION GOES HERE</p>}
        </div>
        <button className="detailsButton" onClick={handleClick} >Add to Adventures</button>
        </div>
    </div>
    </div>
  )
}

export default AttractionDetails
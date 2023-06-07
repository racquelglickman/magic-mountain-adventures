import React, { useState } from 'react'
import { useLocation } from "react-router-dom"

function AttractionDetails() {
  const location = useLocation()
  const state = location.state
  
  const [onItinerary, setOnItinerary] = useState(false)

  const placeholderUrl = "https://w7.pngwing.com/pngs/585/718/png-transparent-six-flags-great-adventure-six-flags-great-america-six-flags-magic-mountain-six-flags-over-georgia-six-flags-america-park-text-photography-logo.png"

  function handleClick(e) {
    console.log(e)
  }

  return (
    <div>
      <h1>{state.name}</h1>
      <img src={placeholderUrl} alt={state.name} />
      <h3>Attraction Type: {state.type}</h3>
      <h3>Thrill Level: {state.thrill_level}</h3>
      {state.height_req > 0 ? <p>Minimum Height Required: {state.height_req} inches</p>: 
      <p>Minimum Height Required:  None</p>}
      {state.avg_wait ? <p>Average Wait Time: {state.avg_wait}</p> : 
      <p>Average Wait Time: N/A</p>}
      {state.avg_rating ? <p>Average User Rating: {state.avg_rating}</p> : 
      <p>Average User Rating: N/A</p>}
      
      <p>THIS WILL EVENTUALLY BE A DESCRIPTION OF HOW AWESOME THIS RIDE IS!!!  IMAGINE A LONG PARAGRAPH ABOUT HOW SUPERMAN OR BATMAN OR WHATEVER NEED YOUR HELP SOLVING A CRIME AND THE ONLY WAY TO DO THAT IS TO BOARD A ROLLER COASTER TO STOP LEX LUTHOR OR SOMETHING.  YEAH!  YOU'RE A NEW MEMBER OF THE JUSTICE LEAGUE AND SAVING THE WORLD ONE THRILL AT A TIME!  OR BY RIDING A CAROUSEL.... WHATEVER.</p>
      
      <button onClick={handleClick} >Add to Adventures</button>
    </div>
  )
}

export default AttractionDetails
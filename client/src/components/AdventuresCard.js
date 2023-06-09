import React, {useState} from 'react'
import ReviewForm from './ReviewForm'
import './adventureCard.css'

function AdventuresCard({adventure, onAdventureDelete}) {

    const [riddenStatus, setRiddenStatus] = useState(adventure.ridden)

    // Backend is already JSONifying response so `res -> res.json()` is unneeded here
    function handleDelete() {
        fetch(`/adventures/${adventure.id}`, 
        {method: 'DELETE',})
        // .then(res => {
            // if res is type json
                // skip
            // else
                // jsonify resp
        // })
        .then(data => {
          onAdventureDelete(adventure.id)
        })
      }
      
      function handleForm(wait, rating) {
        fetch(`/adventures/${adventure.id}`,
        {method: 'PATCH',
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify({
          ridden: true,
          wait_time: wait,
          rating: rating
        })})
        .then(r => r.json())
        .then(data => {
          setRiddenStatus(false)
          onAdventureDelete(adventure.id)
        })
      }

      function setRidden() {
        // fetch(`/adventures/${adventure.id}`,
        // {method: 'PATCH',
        // headers: {
        //     "content-type" : "application/json"
        // },
        // body: JSON.stringify({ridden: true})})
        // .then(r => r.json())
        // .then(data => {setRiddenStatus(data.ridden)})

        setRiddenStatus(!riddenStatus)
      
      }

      // function attractionPatch() {

      // }

  return (
    <div className="adventureCard">
        <h2 className="adventureAttractionName">{adventure.attraction.name}</h2>
        <p className="adventureAttractionType">{adventure.attraction.type}</p>
        {riddenStatus ? <button className="adventureButton" onClick={setRidden}>EXIT</button> : 
        <button className="adventureButton" onClick={handleDelete}>REMOVE</button>}
        {riddenStatus ? <ReviewForm handleForm={handleForm} /> : 
        <button className="adventureButton" onClick={setRidden}>COMPLETED?</button>}
    </div>
  )
}

export default AdventuresCard
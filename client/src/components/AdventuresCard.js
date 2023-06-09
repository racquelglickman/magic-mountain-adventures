import React, {useState} from 'react'
import ReviewForm from './ReviewForm'

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
        fetch(`/adventures/${adventure.id}`,
        {method: 'PATCH',
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify({ridden: true})})
        .then(r => r.json())
        .then(data => {setRiddenStatus(data)})}

  return (
    <div>
        <h2>{adventure.attraction.name}</h2>
        <p>{adventure.attraction.type}</p>
        <button onClick={handleDelete}>REMOVE</button>
        {riddenStatus ? <ReviewForm handleForm={handleForm} /> : 
        <button onClick={setRidden}>COMPLETED?</button>}
    </div>
  )
}

export default AdventuresCard
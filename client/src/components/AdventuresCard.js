import React, {useState, useContext} from 'react'
import { MyContext } from './MyProvider';
import ReviewForm from './ReviewForm'
import './adventureCard.css'

function AdventuresCard({adventure, onAdventureDelete}) {

    const [riddenStatus, setRiddenStatus] = useState(adventure.ridden)
    const { allAdventures } = useContext(MyContext);

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
      
      function averagePatch(adventure) {
        const filteredAdventures = allAdventures.filter((a) => {
          return a.attraction_id === adventure.attraction_id
        })
        
        const numOfRides = filteredAdventures.length

        const averageRating = ((adventure.attraction.avg_rating * (numOfRides - 1) + adventure.rating) / numOfRides).toFixed(1)
        const averageWait = parseInt((adventure.attraction.avg_wait * (numOfRides - 1) + adventure.wait_time) / numOfRides)

        fetch(`/attractions/${adventure.attraction_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            avg_wait: averageWait,
            avg_rating: averageRating
          })
        })
        .then(r => r.json())
        .then(data => console.log(data))
      }

      function handleForm(wait, rating) {
        
        fetch(`/adventures/${adventure.id}`,
        {method: 'PATCH',
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify({
          ridden: true,
          wait_time: parseInt(wait),
          rating: parseFloat(rating)
        })})
        .then(r => r.json())
        .then(data => {
          setRiddenStatus(false)
          onAdventureDelete(data.id)
          averagePatch(data)
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
import React, {useState, useContext} from 'react'
import { useNavigate } from "react-router-dom"
import { MyContext } from './MyProvider';
import ReviewForm from './ReviewForm'
import './adventureCard.css'

function AdventuresCard({adventure, onAdventureDelete}) {

    const [riddenStatus, setRiddenStatus] = useState(adventure.ridden)
    const { allAdventures } = useContext(MyContext);

    const navigate = useNavigate()

    function handleNavigateClick() {
      navigate(`/attractions/${adventure.attraction_id}`, { state: adventure.attraction })
    }

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

      const getThrillLevelClass = () => {
        switch (adventure.attraction.thrill_level) {
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

  return (
    <div className="adventureCard">
      <div className="headerWrapper">
        <div className="adventureDetailBox">
        <h2 className="adventureAttractionName" onClick={handleNavigateClick}>{adventure.attraction.name}</h2>
        <p className="adventureAttractionType">{adventure.attraction.type}</p>
        <p className="adventureAttractionThrill"> Thrill Level:
        <span className={`glow ${getThrillLevelClass()}`}> {adventure.attraction.thrill_level}</span></p>
        </div>
        <div className="reviewFormContainer">
        {riddenStatus ? <button className="adventureButton goBackButton"  onClick={setRidden}>⏎</button> : 
        <button className="adventureButton" onClick={handleDelete}>REMOVE</button>}
        {riddenStatus ? <ReviewForm handleForm={handleForm} /> : 
        <button className="adventureButton" onClick={setRidden}>COMPLETED?</button>}
          </div>
        </div>
    </div>
  )
}

export default AdventuresCard
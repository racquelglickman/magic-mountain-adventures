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
        <h2 className="adventureAttractionName">{adventure.attraction.name}</h2>
        <p className="adventureAttractionType">{adventure.attraction.type}</p>
        <p className="adventureAttractionThrill"> Thrill Level:
        <span className={`glow ${getThrillLevelClass()}`}> {adventure.attraction.thrill_level}</span></p>
        </div>
        <div className="reviewFormContainer">
        {riddenStatus ? <button className="adventureButton goBackButton"  onClick={setRidden}>GO BACK</button> : 
        <button className="adventureButton" onClick={handleDelete}>REMOVE</button>}
        {riddenStatus ? <ReviewForm handleForm={handleForm} /> : 
        <button className="adventureButton" onClick={setRidden}>COMPLETED?</button>}
          </div>
        </div>
    </div>
  )
}

export default AdventuresCard
import React from 'react'

function AdventuresCard({adventure, onAdventureDelete}) {

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

      function setRidden() {
        fetch(`/adventures/${adventure.id}`,
        {method: 'PATCH',
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify({ridden: true})})
      }

  return (
    <div>
        <h2>{adventure.attraction.name}</h2>
        <p>{adventure.attraction.type}</p>
        <button onClick={setRidden}>RIDDEN</button>
        <button onClick={handleDelete}>REMOVE</button>
    </div>
  )
}

export default AdventuresCard
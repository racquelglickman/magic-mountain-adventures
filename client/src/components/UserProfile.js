import React, { useContext, useState } from 'react'
import './userProfile.css'
import { MyContext } from './MyProvider';
import { useResolvedPath } from 'react-router-dom';

function UserProfile() {

  const {user} = useContext(MyContext)
  const [editHeight, setEditHeight] = useState(false)
  const [editHeightValue, setEditHeightValue] = useState(user.height)
  const [userAdventures, setUserAdventures] = useState(user.adventures)

  fetch(`/users/${user.id}`)
    .then((res) => res.json())
    .then((data) => {
      setUserAdventures(data.adventures)
    })

  function handleHeightChange() {
    console.log('Changing the height')
    setEditHeight(!editHeight)
  }

  function handleEditHeight(e) {
    e.preventDefault();
    user.height = editHeightValue
    fetch(`/users/${user.id}`,
      {
        method: 'PATCH',
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({height: editHeightValue})
      })
    setEditHeight(!editHeight)
  }

  const adventureHistory = userAdventures.map((adv) => {
    return <tr>
            <th>{adv.date.split(' ')[0]}</th>
            <th>{adv.attraction.name}</th>
            <th>{adv.rating}</th>
            <th>{adv.wait_time}</th>
            <th>{adv.ridden == false? "Not yet!" : '✅'}</th>
          </tr>
  })

  return (
    <div className="profileContainer">
      <p className="username"> <span className="userInput">#</span> {user.username}</p>
      <div className="main">
        <img className="avatar" src="https://i.imgur.com/3KtXQ0Y.png" alt="avatar" />
        <div className="userInfo">
        <p className="name">Name
          <span className="userInput">: {user.first_name} {user.last_name} </span>
        </p>
        
        <p className="height">Height
          {
            editHeight ? 
            <form onSubmit={handleEditHeight}>
              <input 
                style={{fontSize: '1em', padding: '0rem'}} 
                type='text' 
                placeholder='Edit Height' 
                value={editHeightValue} 
                onChange={(e) => {setEditHeightValue(e.target.value)}}
            ></input>
            </form> 
            : 
            <span className="userInput">: {editHeightValue} in.</span> 
          }
          <button onClick={handleHeightChange}>Edit</button></p>
      </div>
      </div>
      <div className="historyContainer"> 
      <p className="adventureTitle" onClick={() => {console.log(user.adventures)}}>{user.first_name}'s Adventure History</p>
      <table>
        <tr>
          <th>Date</th>
          <th>Attraction</th>
          <th>Rating</th>
          <th>Wait Time</th>
          <th>Ridden</th>
        </tr>
        {adventureHistory}
      </table>
        </div>
    </div>
  )
}

export default UserProfile
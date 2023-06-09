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
    return <tr className="adventureHistoryInput">
            <th className="adventureHistoryInput">{adv.date.split(' ')[0]}</th>
            <th className="adventureHistoryInput">{adv.attraction.name}</th>
            <th className="adventureHistoryInput">{adv.rating}</th>
            <th className="adventureHistoryInput">{adv.wait_time}</th>
            <th className="checkMarks">{adv.ridden == false? <div style={{color:"red"}}>✗</div>: '✓'}</th>
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
          {!editHeight ? <button className="editButton" onClick={handleHeightChange}>Edit</button> : null}</p>
      </div>
      </div>
      <div className="historyContainer"> 
      <p className="adventureTitle" >Your Adventure History</p>
      <table className="tableContainer">
        <tr>
          <th className="categoryTitle">DATE</th>
          <th className="categoryTitle">ATTRACTION</th>
          <th className="categoryTitle">RATING</th>
          <th className="categoryTitle">WAIT TIME</th>
          <th className="categoryTitle">RIDDEN</th>
        </tr>
        {adventureHistory}
      </table>
        </div>
    </div>
  )
}

export default UserProfile
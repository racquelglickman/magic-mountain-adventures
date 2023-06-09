import React, { useContext, useState } from 'react'
import './userProfile.css'
import { MyContext } from './MyProvider';

function UserProfile() {

  const {user} = useContext(MyContext)
  const [editHeight, setEditHeight] = useState(false)
  const [editHeightValue, setEditHeightValue] = useState(user.height)

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
      <p className="adventureTitle">Adventure History</p>
        </div>
    </div>
  )
}

export default UserProfile
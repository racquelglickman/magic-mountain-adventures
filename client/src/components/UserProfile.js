import React, { useContext } from 'react'
import './userProfile.css'
import { MyContext } from './MyProvider';

function UserProfile() {

  const {user} = useContext(MyContext)

  return (
    <div className="profileContainer">
      <p className="username"> <span className="userInput">#</span> {user.username}</p>
      <div className="main">
        <img className="avatar" src="https://i.imgur.com/3KtXQ0Y.png" alt="avatar" />
        <div className="userInfo">
        <p className="name">Name: <span className="userInput">{user.first_name} {user.last_name}</span></p>
        <p className="height">Height: <span className="userInput">{user.height} in.</span></p>
      </div>
      </div>
      <div className="historyContainer"> 
      <p className="adventureTitle">Adventure History:</p>
        </div>
    </div>
  )
}

export default UserProfile
import React, { useContext } from 'react';
import './app.css';
import { Link } from 'react-router-dom';
import { MyContext } from "./MyProvider";

function Nav() {

  const { setUser } = useContext(MyContext)

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <div className='navBar'>
      <img src="https://imgur.com/5DenyI2.png" height='175px' alt='logo'/>
      <div className="navContent">
        <h1 className='tagLine'>Your adventure awaits...</h1>
        <div className="links">
          <Link to="/" className="link">Explore Attractions</Link>
          <Link to="/adventure" className="link">Plan Adventure</Link>
          <Link to="/profile" className="link">My Profile</Link>
          <Link onClick={handleLogout} className="link logoutLink">Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
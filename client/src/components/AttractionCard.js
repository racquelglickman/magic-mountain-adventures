import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom"
import './attractionCard.css';
import { MyContext } from './MyProvider';

function AttractionCard({ attraction, setUserAdventures, adventures }) {
  
  const navigate = useNavigate()

  function handleNavigateClick() {
    navigate(`/attractions/${attraction.id}`, { state: attraction })
  }
  
  const { user } = useContext(MyContext)
  
  const getThrillLevelClass = () => {
    switch (attraction.thrill_level) {
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

  function addAventure() {
    fetch('/adventures', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.id,
        attraction_id: attraction.id
      })
    })
    .then(r => r.json())
    .then(data => setUserAdventures([...adventures, data]))
  }

  return (
    <div className="attractionCard">
      <div className="main">
        <img onClick={handleNavigateClick}  className="thumbnail" src={attraction.thumbnail} alt="thumbnail" />
        <h2 className="attractionName">{attraction.name}</h2>
        <h3 className="attractionType">{attraction.type}</h3>
        {attraction.height_req === 0 ? null : (
          <h4 className="attractionHeight">Height Requirement: {attraction.height_req} inches</h4>
        )}
        <div className="attractionInfo">
          <div className="thrill">
            <p>
              Thrill Level:{' '}
              <span className={`glow ${getThrillLevelClass()}`}>{attraction.thrill_level}</span>
            </p>
            <button onClick={addAventure}>ADD</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttractionCard;
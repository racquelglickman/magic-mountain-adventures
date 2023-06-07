import React from 'react';
import { useNavigate } from "react-router-dom"
import './attractionCard.css';

function AttractionCard({ attraction }) {
  const navigate = useNavigate()

  function handleNavigateClick() {
    navigate(`/attractions/${attraction.id}`, { state: attraction })
  }

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

  return (
    <div className="attractionCard">
      <div className="main">
        <img onClick={handleNavigateClick}  className="thumbnail" src="https://i.imgur.com/1EqM0YX.jpg" alt="thumbnail" />
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttractionCard;
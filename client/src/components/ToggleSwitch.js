import React from "react";
import "./ToggleSwitch.css";
import './homePage.css'
  
const ToggleSwitch = ({label, handleToggle}) => {

  return (
    <div className="toggleContainer">
      {label}{" "}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" 
               name={label} id={label} onClick={handleToggle}/>
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};
  
export default ToggleSwitch;
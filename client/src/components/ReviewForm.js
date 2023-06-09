import React, { useState } from 'react'
import './reviewForm.css'

function ReviewForm({ handleForm }) {
  const [radio, setRadio] = useState(0)
  const [waitTime, setWaitTime] = useState(0)


  function handleWaitChange(e) {
    
    setWaitTime(e.target.value)
  }

  function handleRadioChange(e) {
    
    setRadio(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    handleForm(waitTime, radio)

  }
  
  return (
    <div>
      <form className='reviewForm' onSubmit={handleSubmit}>
        <label className="reviewLabel">How long did you wait in line?</label><br></br>
        <input className="reviewInput" type='number' value={waitTime} step={5} min={0} onChange={handleWaitChange}></input> min.<br></br><br></br>
        
        <label className="reviewLabel">Leave a Rating:</label><br></br>
        1<input className="reviewInput" type='radio' value='1' onChange={handleRadioChange} checked={radio === "1"}></input><br></br>
        2<input className="reviewInput" type='radio' value='2' onChange={handleRadioChange} checked={radio === "2"}></input><br></br>
        3<input className="reviewInput" type='radio' value='3' onChange={handleRadioChange} checked={radio === "3"}></input><br></br>
        4<input className="reviewInput" type='radio' value='4' onChange={handleRadioChange} checked={radio === "4"}></input><br></br>
        5<input className="reviewInput" type='radio' value='5' onChange={handleRadioChange} checked={radio === "5"}></input><br></br>
        <br></br>

        <button className="reviewButton">COMPLETE ADVENTURE</button>
      </form>
    </div>
  )
}

export default ReviewForm
import React, { useState } from 'react'

function ReviewForm({ handleForm }) {
  const [radio, setRadio] = useState(null)
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
        <label>How long did you wait in line?</label><br></br>
        <input type='number' value={waitTime} step={5} min={0} onChange={handleWaitChange}></input> min<br></br>
        
        <label>Rating</label><br></br>
        1<input type='radio' value='1' onChange={handleRadioChange} checked={radio === "1"}></input><br></br>
        2<input type='radio' value='2' onChange={handleRadioChange} checked={radio === "2"}></input><br></br>
        3<input type='radio' value='3' onChange={handleRadioChange} checked={radio === "3"}></input><br></br>
        4<input type='radio' value='4' onChange={handleRadioChange} checked={radio === "4"}></input><br></br>
        5<input type='radio' value='5' onChange={handleRadioChange} checked={radio === "5"}></input><br></br>
        <br></br>

        <button>Submit</button>
      </form>
    </div>
  )
}

export default ReviewForm
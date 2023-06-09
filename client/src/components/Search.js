import React from 'react'
import './searchBar.css'
import './homePage.css'

function Search({ attractionSearch, handleSearch }) {
  return (
    <div className="searchContainer">
      <input className="input"
      value={attractionSearch}
        type="text"
        id="search"
        placeholder="Search Attractions..."
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
      />
    </div>
  )
}

export default Search
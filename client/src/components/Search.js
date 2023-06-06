import React from 'react'

function Search({ attractionSearch, handleSearch }) {
  return (
    <div>
      <input
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
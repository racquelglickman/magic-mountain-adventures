import React from 'react';
import AttractionCard from './AttractionCard';
import './homePage.css';

function AttractionsContainer({ filteredList, currentPage, attractionsPerPage, setUserAdventures, adventures }) {
  const indexOfLastAttraction = currentPage * attractionsPerPage;
  const indexOfFirstAttraction = indexOfLastAttraction - attractionsPerPage;
  const attractionsToRender = filteredList.slice(indexOfFirstAttraction, indexOfLastAttraction).map((attraction) => {
    return <AttractionCard key={attraction.id} attraction={attraction} setUserAdventures={setUserAdventures} adventures={adventures}/>;
  });

  return (
    <div className="attractionContainer">
      {attractionsToRender}
    </div>
  );
}

export default AttractionsContainer;
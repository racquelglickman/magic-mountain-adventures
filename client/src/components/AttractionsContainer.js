import React from 'react';
import AttractionCard from './AttractionCard';
import './attractionCard.css';

function AttractionsContainer({ filteredList, currentPage, attractionsPerPage }) {
  const indexOfLastAttraction = currentPage * attractionsPerPage;
  const indexOfFirstAttraction = indexOfLastAttraction - attractionsPerPage;
  const attractionsToRender = filteredList.slice(indexOfFirstAttraction, indexOfLastAttraction).map((attraction) => {
    return <AttractionCard key={attraction.id} attraction={attraction} />;
  });

  return (
    <div className="attractionContainer">
      {attractionsToRender}
    </div>
  );
}

export default AttractionsContainer;
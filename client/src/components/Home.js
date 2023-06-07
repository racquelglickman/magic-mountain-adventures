import React, { useContext, useState } from 'react';
import Search from './Search';
import AttractionsContainer from './AttractionsContainer';
import { MyContext } from './MyProvider';
import ToggleSwitch from './ToggleSwitch';

function Home() {
  const { attractions, user } = useContext(MyContext);

  const [attractionSearch, setAttractionSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const attractionsPerPage = 6;

  function handleSearch(target) {
    setAttractionSearch(target);
    setCurrentPage(1); // Reset to the first page when the search query changes
  }

  const filteredList = attractions.filter((attraction) => {
    return attraction.name.toLowerCase().includes(attractionSearch.toLowerCase());
  });

  const handleNextPage = () => {
    const lastPage = Math.ceil(filteredList.length / attractionsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, lastPage));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const [toggleAdventures, setToggleAdventures] = useState(false);

  const handleToggle = () => {
    setToggleAdventures(!toggleAdventures);
  };

  return (
    <div>
      <ToggleSwitch label=' ' handleToggle={handleToggle} />
      {!toggleAdventures && <Search attractionSearch={attractionSearch} handleSearch={handleSearch} />}
      {!toggleAdventures && (
        <AttractionsContainer
          filteredList={filteredList}
          currentPage={currentPage}
          attractionsPerPage={attractionsPerPage}
        />
      )}
      {toggleAdventures ? 'Adventures Placeholder' : (
        <div>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredList.length / attractionsPerPage)}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Home;
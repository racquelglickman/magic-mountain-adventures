
import React, { useContext, useState, useEffect } from 'react';
import Search from './Search';
import AttractionsContainer from './AttractionsContainer';
import { MyContext } from './MyProvider';
import ToggleSwitch from './ToggleSwitch';
import AdventuresContainer from './AdventuresContainer'
import './attractionCard.css';

function Home() {
  const { attractions, user } = useContext(MyContext);

  const [attractionSearch, setAttractionSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const attractionsPerPage = 6;

  function handleSearch(target) {
    setAttractionSearch(target);
    setCurrentPage(1);
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

  const showPreviousButton = currentPage > 1;

  // fetches user adventures

  const [userAdventures, setUserAdventures] = useState([])

  
  useEffect(() => {
    fetch(`/adventures/user/${user.id}`)
    .then(r => r.json())
    .then(data => {
      setUserAdventures(data)
      console.log(data)})
  }, [])

  return (
    <div className="homeContainer">
      
      {!toggleAdventures ? <Search attractionSearch={attractionSearch} handleSearch={handleSearch} /> : null}
      <div className="headerContainer">
        <ToggleSwitch label=' ' handleToggle={handleToggle} />
      </div>
      
      <div className="contentContainer">
        <div className="attractionsWrapper">
          {!toggleAdventures && (
            <div>
              <AttractionsContainer
                filteredList={filteredList}
                currentPage={currentPage}
                attractionsPerPage={attractionsPerPage}
                attractions={attractions} 
                setUserAdventures={setUserAdventures} 
                adventures={userAdventures}
              />
              <div className="buttonContainer">
                {showPreviousButton && (
                  <button className="pageButton" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Prev
                  </button>
                )}
                <button
                  className="pageButton"
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(filteredList.length / attractionsPerPage)}
                >Next</button>
              </div>
            </div>
          )}      
        </div>
        
        {toggleAdventures ? (
          <AdventuresContainer adventures={userAdventures}/>
        ) : (
          <div className="mapContainer">
            {/* Map component goes here */}
            <div className="mapPlaceholder">Map Placeholder</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
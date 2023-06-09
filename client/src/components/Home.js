
import React, { useContext, useState, useEffect } from 'react';
import Search from './Search';
import AttractionsContainer from './AttractionsContainer';
import { MyContext } from './MyProvider';
import ToggleSwitch from './ToggleSwitch';
import AdventuresContainer from './AdventuresContainer'
import './homePage.css';
import './searchBar.css'
import Map from "./Map"

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
    return attraction.name.toLowerCase().includes(attractionSearch.toLowerCase()) || attraction.thrill_level.toLowerCase().includes(attractionSearch.toLocaleLowerCase());
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
      })
  }, [toggleAdventures])

  // Data for rendering markers
  // const [markers, setMarkers] = useState(attractions)

  // useEffect(() => {
  //   if (toggleAdventures) {
  //     setMarkers(userAdventures)
  //   } else {
  //     setMarkers(attractions)
  //   }
  // }, [toggleAdventures])

  return (
    <div className="homeContainer">
      <div className="headerContainer">
      {!toggleAdventures ? <div className="searchContainer"><Search attractionSearch={attractionSearch} handleSearch={handleSearch} /></div> : null}
      <div className="toggleContainer"><ToggleSwitch label=' ' handleToggle={handleToggle} /></div>
      </div>
      
      <div className="contentContainer">
        <div className="attractionsWrapper">
          {!toggleAdventures ? (
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
          ) : (
            <AdventuresContainer adventures={userAdventures} setUserAdventures={setUserAdventures}/>
          )}      
        </div>
        <div className="mapContainer">
            <Map toggle={toggleAdventures} adventures={userAdventures} />
            {/* <div className="mapPlaceholder">Map Placeholder</div> */}
          </div>
      
      </div>
    </div>
  );
}

export default Home;
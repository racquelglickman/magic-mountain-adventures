import React, { useEffect, useState } from "react";
import { Switch, Route, Routes } from "react-router-dom";
import MyProvider from "./MyProvider";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import AttractionDetails from "./AttractionDetails";
import Map from "./Map.js"
import UserProfile from "./UserProfile";
import Error from "./Error";
import PlanAdventure from "./PlanAdventure";

function App() {
  
return (
  <div>
  <MyProvider>
    <Nav/>
    <Map />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/attractions/:id' element={<AttractionDetails />} />
      <Route path='/adventure' element={<PlanAdventure />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path='*' element={<Error />} />
    </Routes>
  </MyProvider>
  </div>
  
)
  
}

export default App;

import React, { useEffect, useState } from "react";
import { Switch, Route, Routes } from "react-router-dom";
import MyProvider from "./MyProvider";
import Home from "./Home";
import Login from "./Login";
import AttractionDetails from "./AttractionDetails";
import UserProfile from "./UserProfile";
import Error from "./Error";

function App() {
  
return (
  <div>
    <MyProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/attractions/:id' element={<AttractionDetails />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path='*' element={<Error />} />
    </Routes>
  </MyProvider>
  </div>
  
)
  
}

export default App;

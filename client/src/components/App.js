import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MyProvider, { MyContext } from "./MyProvider";
import Home from "./Home";
import Login from "./Login";
import AttractionDetails from "./AttractionDetails";
import UserProfile from "./UserProfile";
import Error from "./Error";

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin= {setUser}/>;
    
  return (
    <div>
      <MyProvider>
      <Routes>
        <Route path="/" element={<Home setUser= {setUser}/>} />
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

import React from 'react'

function Home({ setUser }) {

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <div>
        <h1>Hello Theme Park Lovers</h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
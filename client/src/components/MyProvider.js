import { useState, useEffect, createContext } from "react"
import Login from "./Login";

export const MyContext = createContext()

function MyProvider({ children }) {
    
    // attractions fetch

    const [attractions, setAttractions] = useState([])

    useEffect(() => {
        fetch("/attractions")
        .then(r => r.json())
        .then(data => setAttractions(data))
    }, [])
    
    // all adventures fetch

    const [allAdventures, setAllAdventures] = useState([])

    useEffect(() => {
        fetch("/adventures")
        .then(r => r.json())
        .then(data => setAllAdventures(data))
    }, [])
    
    // auto login authetification
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
        <MyContext.Provider
            value={({user: user, setUser: setUser, attractions: attractions, allAdventures: allAdventures})}
        >
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider
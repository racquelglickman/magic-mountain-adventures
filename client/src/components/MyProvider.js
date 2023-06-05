import { useState, useEffect, createContext } from "react"

export const MyContext = createContext()

function MyProvider({ children }) {

    return (
        <MyContext.Provider
            // value={({pass: pass})}
        >
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider
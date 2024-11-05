import { createContext, useState } from "react";


export const Context = createContext()


export function CustomContext({children}){
    const [token, setToken] = useState(null)
    const [uri, setUri] = useState(null)
    const [player, setPlayer] = useState(false)

    return (
        <Context.Provider value={{token, setToken, player, setPlayer, uri, setUri}}>
            {children}
        </Context.Provider>
    )
}
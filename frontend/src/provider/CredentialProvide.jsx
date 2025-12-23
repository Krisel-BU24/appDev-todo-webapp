import { useState } from "react"
import CredentialContext from "../context/CredentialContext"

const CredentialProvider = ({children}) => {
    const [userName, setUserName] = useState("");
    
    return (
        <CredentialContext.Provider value={{userName, setUserName}}>
            {children}
        </CredentialContext.Provider>
    )
}

export default CredentialProvider;
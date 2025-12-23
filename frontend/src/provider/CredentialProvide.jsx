import { useState } from "react"
import CredentialContext from "../context/CredentialContext"

const CredentialProvider = ({children}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const packageData = {userName, setUserName, password, setPassword}
    return (
        <CredentialContext.Provider value={packageData}>
            {children}
        </CredentialContext.Provider>
    )
}

export default CredentialProvider;
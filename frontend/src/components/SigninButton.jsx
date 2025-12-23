import { useContext } from "react"
import CredentialContext from "../context/CredentialContext"

const SigninButton = () => {
    const { userName, setUserName, password, setPassword} = useContext(CredentialContext)

    const handleSignUp = async () => {
        const userExist = await checkIfUserExist(userName)
        
        if (!userExist) {
            // send user credential to db 
        } else {
            alert("user name already exist. Please log in / use different user name")
        }
    }


    return <button type="submit" onClick={handleSignUp}>
            Sign Up
        </button>
}

export default SigninButton;
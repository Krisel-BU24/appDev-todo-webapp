import { useContext } from "react"
import CredentialContext from "../context/CredentialContext"

const SigninButton = () => {
    const { userName, setUserName } = useContext(CredentialContext)

    const handleSignUp = () => {
        const userExist = await checkIfUserExist(userName)
        
    }


    return <button>Sign Up</button>
}

export default SigninButton;
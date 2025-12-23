import { useContext } from "react"
import checkIfUserExist from "../helper/checkUser"
import CredentialContext from "../context/CredentialContext"

const LoginButton = () => {
    const { userName, setUserName } = useContext(CredentialContext)

    const handleLoginClick = async () => {
        // return;
        const userExist = await checkIfUserExist(userName)

        if (userExist) {
            // navigate to /to-do
        } else {
            alert("username not found. please sign up")
        }
    }

    return <button onClick={handleLoginClick}>Log in</button>
}


export default LoginButton;

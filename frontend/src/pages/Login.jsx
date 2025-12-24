import "..//style/login.css";
import LoginButton from  "../components/LoginButton.jsx"
const Login = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        console.log("Username:", username);
        console.log("Password:", password);

        const packageCredential = {
            username, password
        }

        try {
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(packageCredential)
            }) 

            const data = await response.json();

            if (response.ok) {
                console.log("Success:", data.message);
                alert("Account created! Now you can log in.");
            } else {
                console.error("Error:", data.error);
                alert(data.error);
            }

        } catch (err) {
            console.error("Network error:", err);
        }
    };

    return (
        <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
            <h3>Login / Sign up</h3>

            <input
            type="text"
            name="username"
            placeholder="Username"
            required
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            required
            />

            <button type="submit">Sign Up</button>
            <LoginButton/>

        </form>
        </div>
    );
};

export default Login;

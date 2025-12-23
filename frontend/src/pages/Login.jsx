import "..//style/login.css";
import LoginButton from  "../components/LoginButton.jsx"
const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        console.log("Username:", username);
        console.log("Password:", password);

        // later:
        // fetch("http://localhost:3000/login", { ... })
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

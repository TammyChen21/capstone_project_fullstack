import "./Login.css";
export default function Login(): JSX.Element {
    return (
        <div className="shell">
            <h3>Welcome!</h3>
            <form>
                <input type="text" id="username" name="username" placeholder="Username" />
                <input type="password" id="password" name="password" placeholder="Password"/>
                <button type="submit" id="loginbtn" value="login" className="login-btn">Login</button>
            </form>
        </div>
    )
}
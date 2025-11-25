import { useState } from "react";
import "@src/assets/styles/login.css"; // import CSS file

interface LoginPageProps {
    setLoginState: (val: boolean) => void;
    userEmail: string;
    userPassword: string;
}


export default function LoginPage({ setLoginState, userEmail, userPassword }: LoginPageProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login-container">
            <form onSubmit={(e) => {
                e.preventDefault();
                console.log("Email:", email);
                console.log("Password:", password);

                if (email === userEmail && password === userPassword) {
                    setLoginState(true);
                }
                else {
                    alert('Wrong information entered');
                }


            }} className="login-form">
                <h2>Login</h2>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                    />
                </div>

                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
        </div>
    );
}

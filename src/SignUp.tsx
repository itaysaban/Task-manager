import React, { useState } from "react";
import { FormEvent } from "react";

const SignUp: React.FC = () => {

    const [username, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (!/\d/.test(password)) {
            setError("Password must contain at least one digit.");
            return;
        }

        if (!/[A-Z]/.test(password)){
            setError("Password must contain at least one uppercase letter.");
                return;
        }

        if (password !== confirmPassword){
            setError("Passwords do not match.");
        return;
        }

        setError("");
        alert("Sign-up successful!");
        setUserName("")
        setConfirmPassword("")
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h2 className="signup-title">Sign Up</h2>
                    <div className="signup-inputs">

                        <input className="signup-username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}/>

                        <input className="signup-password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                        <input className="signup-confirm-password"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}/>

                    </div>
                {error && <p style={{color :"red"}}>{error}</p>}

                <button className="signup-submit">Sign up</button>
            </form>
        </div>
            
    );
};

export default SignUp;
import React, { useContext, useState } from "react";
import { FormEvent } from "react";
import { AuthContext} from "./AuthContext";
import axios from "axios"
import userEvent from "@testing-library/user-event";

const SignUp: React.FC = () => {

    const authContext = useContext(AuthContext)
    const {setUsername, setPassword} = authContext!;
    const [localUsername, setLocalUsername] = useState("");
    const [localPassword, setLocalPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setUsername(localUsername)
        setPassword(localPassword)

        if (localPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (!/\d/.test(localPassword)) {
            setError("Password must contain at least one digit.");
            return;
        }

        if (!/[A-Z]/.test(localPassword)){
            setError("Password must contain at least one uppercase letter.");
                return;
        }

        if (localPassword !== confirmPassword){
            setError("Passwords do not match.");
        return;
        }

        setError("");
        try {
            const response = await axios.post("/api/signup", {
              username: localUsername,
              password: localPassword,
            });
      
            if (response.data.success) {
              alert("Sign-up successful!");
            } else {
              setError(response.data.message || "Sign-up failed. Try again.");
            }
          } catch (error) {
            setError("Error during sign-up. Please try again.");
          }
      
          setLocalUsername("");
          setLocalPassword("");
          setConfirmPassword("");
        };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h2 className="signup-title">Sign Up</h2>
                    <div className="signup-inputs">

                        <input className="signup-username"
                        type="text"
                        placeholder="Username"
                        value={localUsername}
                        onChange={(e) => setLocalUsername(e.target.value)}/>

                        <input className="signup-password"
                        type="password"
                        placeholder="Password"
                        value={localPassword}
                        onChange={(e) => setLocalPassword(e.target.value)}/>

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
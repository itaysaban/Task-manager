import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const Login: React.FC = () => {
    const authContext = useContext(AuthContext);
    const { username, password } = authContext!;

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");

    const handleLogin = () => {
        if (enteredUsername === username && enteredPassword === password) {
            alert("Login Successful!");
        } else {
            alert("Invalid Credentials");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={enteredUsername} 
                onChange={(e) => setEnteredUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={enteredPassword} 
                onChange={(e) => setEnteredPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;

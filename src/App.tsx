import React, { useState } from 'react';
import SignUp from './SignUp';
import './App.css';
import MainMenu from './MainMenu';
import Login from './Login';
import AuthProvider from './AuthProvider';

const App: React.FC = () => {
const [currentScreen, setCurrentScreen] = useState('menu')

const handleSignUp = () => {
    setCurrentScreen('signup')
}

const handleLogin = () => {
    setCurrentScreen('login')
}

    return (
        <AuthProvider>
        <div>
            {currentScreen !== 'menu' && <h1>Jira Hater</h1>}
            {currentScreen === 'menu' && (
                <MainMenu
                onSignUp={handleSignUp}
                onLogin={handleLogin} />
            )}
            
            {currentScreen === 'signup' && <SignUp />}
            {currentScreen === 'login' && <Login />}
        </div>
        </AuthProvider>
    );
}

export default App;

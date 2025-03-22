import React, { useState } from 'react';
import SignUp from './SignUp';
import './App.css';
import MainMenu from './MainMenu';
import Login from './Login';

const App: React.FC = () => {

const [currentScreen, setCurrentScreen] = useState('menu')

const handleSignUp = () => {
    setCurrentScreen('signup')
}

const handleLogin = () => {
    setCurrentScreen('login')
}

    return (
        <div>
            {currentScreen === 'menu' && (
                <MainMenu
                onSignUp={handleSignUp}
                onLogin={handleLogin} />
            )}
            
            {currentScreen === 'signup' && <SignUp />}
            {currentScreen === 'login' && <Login />}
        </div>
    );
}

export default App;

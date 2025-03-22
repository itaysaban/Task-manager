import { useState } from "react";


interface MainMenuProps {
    onSignUp: () => void;
    onLogin: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({onSignUp, onLogin}) => {
    return (
        <div>
            <h1 id="gametitle">Jira Hater</h1>
                <div className='menubuttons'>
                    <button id="menu-signup-button" onClick={onSignUp}>Sign me up!</button>
                    <button id="menu-login-button"  onClick={onLogin}>Let's get in!</button>
                </div>
        </div>
    )
}

export default MainMenu;
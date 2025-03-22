import { useState } from "react";


interface MainMenuProps {
    onSignUp: () => void;
    onLogin: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({onSignUp, onLogin}) => {
    return (
        <div>
            <h1 className="menu-buttons">Jira Hater</h1>
                <div className='menubuttons'>
                    <button className="menu-signup-button" onClick={onSignUp}>Sign me up!</button>
                    <button className="menu-login-button"  onClick={onLogin}>Let's get in!</button>
                </div>
        </div>
    )
}

export default MainMenu;
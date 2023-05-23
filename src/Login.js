import React, { useState } from 'react';
import globalVars from './globalVar';
function Login() {
    const [successPopup, setSuccessPopup] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePopupClose = () => {
        setSuccessPopup(false);
        setErrorPopup(false);
      };

    const Authorize = async () => {
        try {
            const body = {
                user: username,
                pass: password
            };

            console.log(username);
            console.log(password);
            const response = await fetch(globalVars.hostUrl + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                setErrorPopup(true);
                throw new Error('Invalid Credential');
            }
            sessionStorage.setItem('myBoolean', 'true');
            setSuccessPopup(true);
        } catch (error) {

            console.error('Error posting data:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        Authorize();
        // Reset the input fields
        setUsername('');
        setPassword('');


        
    };

    window.addEventListener('beforeunload', function () {
        sessionStorage.removeItem('myBoolean');
    });

    return (
        <div>

            <h4>Insert your admin credintials here</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            {successPopup && (
                <div className="overlay">
                    <div className="popup success-popup">
                        <p>Logged in successfully!</p>
                        <button onClick={handlePopupClose}>Close</button>
                    </div>
                </div>
            )}

            {errorPopup && (
                <div className="overlay">
                    <div className="popup error-popup">
                        <p>Failed To Login.</p>
                        <button onClick={handlePopupClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
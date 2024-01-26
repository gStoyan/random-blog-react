import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let isUserNameValid = false;
    let isPasswordValid = false;
    let isFormValid = isUserNameValid && isPasswordValid;
    let validationMessage = '';

    const handleUsernameChange = (e) => {
        if (e.target.value.length < 4) {
            isFormValid = false;
            validationMessage = 'Username must be at least 4 characters long';
        }
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleDateOfBirthChange = (e) => {
        setDateOfBirth(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h2>Login</h2>
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
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="dateOfBirth">Date of birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        value={dateOfBirth}
                        onChange={handleDateOfBirthChange}
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
                </div><div>
                    <label htmlFor="confirmPassword">Confirm password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                <button type="submit" {...isFormValid ? "" : "disabled"} >Login</button>
                <p {...isFormValid ? "hidden" : ""}>{validationMessage}</p>
            </form>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import './signup.css';
import { useSignup } from '../hooks/useSignup';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const { signup, error, isLoading } = useSignup();



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle sign up logic here

        await signup(name, email, password)
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button disabled=
                    {isLoading} type="submit">Sign Up</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
};

export default Signup;

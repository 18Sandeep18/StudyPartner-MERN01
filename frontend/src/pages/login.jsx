import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin'
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        await login(email, password)
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    required
                />
                <button disabled={isLoading} type="submit" >Login</button>
                <p>Not a user? <Link to="/signup">Sign up here</Link></p>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
};

export default Login;

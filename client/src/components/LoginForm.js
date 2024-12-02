import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setShowWelcome(true);
      // Setting a timer so that the login welcome message redirects after 4 seconds
      setTimeout(() => {
        navigate('/');
      }, 4000);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-form">
      {showWelcome ? (
        <div className="welcome-message">
          <h2>Welcome to CPAN-214, {username}!</h2>
        </div>
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <button onClick={() => navigate('/signup')}>
            Signup Page
          </button>
        </>
      )}
    </div>
  );
}

export default LoginForm;
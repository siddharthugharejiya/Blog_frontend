import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  localStorage.setItem('Token', token);
  localStorage.setItem('UserId', userId);
  const nav = useNavigate()

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const change = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:9595/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((res) => {
        setToken(res.token);
        setUserId(res.data._id);
        nav("/own")
      });
  };

  return (
    <div className="a">
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={submit}>
        <input
          type="text"
          name="email"
          value={state.email}
          onChange={change}
          placeholder="Email"
          className="login-input"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={change}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
    </div>

  );
}

export default Login;

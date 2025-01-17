import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  localStorage.setItem('Token', token);
  localStorage.setItem('UserId', userId);
  const nav = useNavigate();

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
    await fetch('https://blog-backend-sf2c.onrender.com/login', {
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
        localStorage.setItem('Token', res.token);
        localStorage.setItem('UserId', res.data._id);

        Swal.fire({
          title: 'Login Successful',
          text: 'You are now logged in!',
          icon: 'success',
          confirmButtonText: 'Okay',
        });

        nav("/own");
      })
      .catch((error) => {
        Swal.fire({
          title: 'Login Failed',
          text: 'Please check your credentials and try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
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

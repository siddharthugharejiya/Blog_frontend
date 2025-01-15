import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [state, setState] = useState({
    username: '',
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
      const nav = useNavigate()
      const submit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch("http://localhost:9595/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
          });
      

          const data = await response.json();
      
          if (response.ok) {
            alert("Data added successfully");
            nav("/login"); 
          } else {
            alert("Error: " + data.message || "Something went wrong");
          }
        } catch (error) {
          console.error("Error during sign up:", error);
          alert("An error occurred while signing up.");
        }
      };
      

  return (
    <div className="a">
       <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={submit}>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={change}
          placeholder="Username"
          className="signup-input"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={change}
          placeholder="Email"
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={change}
          placeholder="Password"
          className="signup-input"
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
    </div>
   
  );
}

export default SignUp;

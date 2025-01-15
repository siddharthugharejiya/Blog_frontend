import React, { useState } from 'react';
import "../App.css"
function Add() {
    const token = localStorage.getItem('Token');
    const [state, setState] = useState({
        title: "",
        image: "",
        description: ""
    });

    const change = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    }

    const submit = (e) => {
        e.preventDefault();
        fetch("http://localhost:9595/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(state)
        });
    }

    return (
        <div className="a">
  <form className="add-form" onSubmit={submit}>
            <input className="form-input" type="text" name='title' value={state.title} onChange={change} placeholder="Title" />
            <input className="form-input" type="text" name='image' value={state.image} onChange={change} placeholder="Image URL" />
            <input className="form-input" type="text" name='description' value={state.description} onChange={change} placeholder="Description" />
            <input className="submit-btn" type="submit" value="Add" />
        </form>
        </div>
      
    )
}

export default Add;

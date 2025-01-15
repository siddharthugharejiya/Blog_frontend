import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function Add() {
    const token = localStorage.getItem('Token');
    const [state, setState] = useState({
        title: "",
        image: "",
        description: "",
        author: "",
    });

    const change = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const submit = (e) => {
        e.preventDefault();
        fetch("https://blog-backend-sf2c.onrender.com/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(state)
        })
        .then(res => res.json())
        .then(res => {
            Swal.fire({
                title: 'Success!',
                text: 'Blog post added successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        })
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        });
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg rounded">
                <div className="card-header text-center bg-dark text-white">
                    <h4>Add New Blog</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <input 
                                className="form-control" 
                                type="text" 
                                name="title" 
                                value={state.title} 
                                onChange={change} 
                                placeholder="Title" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                className="form-control" 
                                type="text" 
                                name="image" 
                                value={state.image} 
                                onChange={change} 
                                placeholder="Image URL" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <textarea 
                                className="form-control" 
                                name="description" 
                                value={state.description} 
                                onChange={change} 
                                placeholder="Description" 
                                rows="4" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                className="form-control" 
                                type="text" 
                                name="author" 
                                value={state.author} 
                                onChange={change} 
                                placeholder="Author Name" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                className="form-control" 
                                type="date" 
                                name="date" 
                                onChange={change} 
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-dark text-white" type="submit">Add Blog</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Add;

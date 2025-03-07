import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


function Blog() {
  const token = localStorage.getItem("Token");
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(state);
  

  useEffect(() => {
    fetch("https://blog-backend-sf2c.onrender.com/blog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setState(res.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Blog Posts</h1>
      {state.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No blogs found.
        </div>
      ) : (
        <div className="row">
          {state.map((el) => (
            
            <div key={el._id} className="col-md-4 mb-4">
              
              <div className="card h-100">
                <img
                  src={el.image}
                  className="card-img-top"
                  alt="Blog Post"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Title : {el.title}</h5>
                  <p className="card-text">Description : {el.description}</p>
                  <p className="card-author">By: {el.author}</p>
                  <p className="card-date">Published on: {new Date(el.createdAt).toLocaleDateString()}</p>
                  <p></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;

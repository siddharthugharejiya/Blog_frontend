import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Single() {
  const [state, setState] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch the single blog data
    fetch(`http://localhost:9595/single/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setState(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("Token");
      const res = await fetch(`http://localhost:9595/del`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Blog deleted successfully.");
      } else {
        alert(data.msg || "Failed to delete the blog.");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("An error occurred while deleting the blog.");
    }
  };

  const nav = useNavigate();
  const handleEdit = (id) => {
    nav(`/edite/${id}`);
  };

  if (!state) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Blog Details</h1>
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <img
          src={state.image}
          className="card-img-top"
          alt="Blog"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">Title : {state.title}</h5>
          <p className="card-text">Decription : {state.description}</p>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(state._id)}
            >
              Delete
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleEdit(state._id)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single;

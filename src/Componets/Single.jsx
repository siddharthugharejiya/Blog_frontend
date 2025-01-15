import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Single() {
  const [state, setState] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://blog-backend-sf2c.onrender.com/single/${id}`)
      .then((res) => res.json())
      .then((res) => setState(res))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("Token");
      const res = await fetch(`https://blog-backend-sf2c.onrender.com/del`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Deleted!",
          text: "Blog deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/own"); 
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.msg || "Failed to delete the blog.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the blog.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
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
          <h5 className="card-title">Title: {state.title}</h5>
          <p className="card-text">Description: {state.description}</p>
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

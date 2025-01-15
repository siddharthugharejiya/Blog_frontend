import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css"

function Edite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [old, setOld] = useState({
    title: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:9595/edite/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch the blog data");
        }

        const data = await res.json();
        setOld(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        alert("Unable to load the blog data.");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOld((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:9595/edite/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(old),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Blog updated successfully!");
        navigate("/");
      } else {
        alert(result.msg || "Failed to update the blog.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("An error occurred while updating the blog.");
    }
  };

  return (
    <div className="edit-container">
      <h1 className="edit-title">Edit Blog</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          className="edit-input"
          type="text"
          name="title"
          placeholder="Title"
          value={old.title}
          onChange={handleChange}
        />
        <input
          className="edit-input"
          type="text"
          name="image"
          placeholder="Image URL"
          value={old.image}
          onChange={handleChange}
        />
        <input
          className="edit-input"
          type="text"
          name="description"
          placeholder="Description"
          value={old.description}
          onChange={handleChange}
        />
        <button className="edit-submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Edite;

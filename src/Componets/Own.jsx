import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Own() {
  let token = localStorage.getItem("Token");
  let UserId = localStorage.getItem("UserId");
  console.log(token);
  console.log(UserId);

  const nav = useNavigate();
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9595/own", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.data) {
          setState(res.data);
        } else {
          setState([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setState([]);
      });
  }, [token]);

  const submit = (id) => {
    console.log(id);
    nav(`/single/${id}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Blog Posts</h1>
      <div className="row">
        {state.length === 0 ? (
          <p className="text-center">No blogs available. Please create one!</p>
        ) : (
          state.map((el) => (
            <div
              key={el._id}
              className="col-md-4 mb-4"
              onClick={() => submit(el._id)}
            >
              <div className="card h-100">
                <img
                  src={el.image}
                  className="card-img-top"
                  alt="Blog Post"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Title : {el.title}</h5>
                  <p className="card-text">description : {el.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Own;

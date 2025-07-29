import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserCreate() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    function handleChange(event) {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit() {
        axios
            .post("http://localhost:3004/users", user)
            .then((res) => {
                alert(`Create user ${JSON.stringify(res.data)} successfully!!!`);
                navigate("/");
            })
            .catch((err) => {
                throw err;
            });
    }

    return (
      <div>
        <h1 className="mb-4">Create User</h1>
        <Link to="/" className="btn btn-secondary mb-4">
          Back to List
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="birthday" className="form-label">
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Create
          </button>
        </form>
      </div>
    );
}

export default UserCreate;
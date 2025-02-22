import { useState } from "react";
import { createUser, updateUser } from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingUser = location.state?.user || {};

  const [user, setUser] = useState({
    name: existingUser.name || "",
    email: existingUser.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingUser.id) {
      await updateUser(existingUser.id, user);
    } else {
      await createUser(user);
    }
    navigate("/users");
  };

  return (
    <div>
      <h2>{existingUser.id ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        {!existingUser.id && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{existingUser.id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default UserForm;

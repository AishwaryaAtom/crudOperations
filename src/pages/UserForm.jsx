import React, { useState, useEffect } from "react";

const UserForm = ({ addUser, editingUser, updateUser }) => {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ name: "", email: "" }); // Clear form after editing
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(user);
    } else {
      addUser(user);
    }
    setUser({ name: "", email: "" });
  };

  return (
    <div>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <button type="submit">{editingUser ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default UserForm;

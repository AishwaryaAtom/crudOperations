import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./UserList";
import UserForm from "./UserForm"; // Create your own CSS file for styling
const Home = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://664987484032b1331bee24c8.mockapi.io/api/v1/user"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post(
        "https://664987484032b1331bee24c8.mockapi.io/api/v1/user",
        user
      );
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  const updateUser = async (user) => {
    try {
      const response = await axios.put(
        `https://664987484032b1331bee24c8.mockapi.io/api/v1/user/${user.id}`,
        user
      );
      setUsers(users.map((u) => (u.id === user.id ? response.data : u)));
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://664987484032b1331bee24c8.mockapi.io/api/v1/user/${id}`
      );
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm
        addUser={addUser}
        editingUser={editingUser}
        updateUser={updateUser}
      />
      <UserList
        users={users}
        setEditingUser={setEditingUser}
        deleteUser={deleteUser}
      />
    </div>
  );
};

export default Home;

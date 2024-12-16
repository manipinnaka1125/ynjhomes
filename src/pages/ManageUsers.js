import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../cssfiles/ManageUsers.css";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
    address: "",
    dateOfBirth: "",
    gender: "male",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/all");
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/delete/${userId}`);
      toast.success("User deleted successfully!");
      fetchUsers(); // Refresh the user list after delete
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/update/${editingUser.id}`,
        formData
      );
      toast.success(response.data);
      fetchUsers(); // Refresh the user list after update
      setEditingUser(null);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Count users by role
  const roleCounts = {
    buyer: users.filter(user => user.role === "buyer").length,
    seller: users.filter(user => user.role === "seller").length,
    agent: users.filter(user => user.role === "agent").length,
  };

  return (
    <div>
    <div className="manage-users-container">
      <h1>Manage Users</h1>

      {/* User Role Counts */}
      <div className="role-counts">
        <p><strong>Buyers:</strong> {roleCounts.buyer}</p>
        <p><strong>Sellers:</strong> {roleCounts.seller}</p>
        <p><strong>Agents:</strong> {roleCounts.agent}</p>
      </div>

      {/* Display Users List in Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit User Form */}
      {editingUser && (
        <div className="edit-user-form">
          <h2>Edit User</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <label>
              Role:
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="agent">Agent</option>
              </select>
            </label>
            <label>
              Address:
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </label>
            <label>
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <button type="button" onClick={handleUpdate} className="btn-update">
              Update User
            </button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default ManageUsers;

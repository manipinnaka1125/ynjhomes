import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../cssfiles/AdminManageProperties.css";
import AdminNavbar from "../components/AdminNavBar";

const AdminManageProperties = () => {
  const [properties, setProperties] = useState([]); // List of properties
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  }); // New property form data
  const [image, setImage] = useState(null); // Image for the property
  const [isEditing, setIsEditing] = useState(false); // Flag to toggle editing state
  const [editPropertyId, setEditPropertyId] = useState(null); // Property ID to edit

  // Fetch all properties when the component mounts
  useEffect(() => {
    fetchProperties();
  }, []);

  // Function to fetch properties from the backend
  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/properties");
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch properties.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission for adding or editing properties
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newProperty.title);
    formData.append("description", newProperty.description);
    formData.append("price", newProperty.price);
    formData.append("location", newProperty.location);

    if (image) {
      formData.append("image", image); // Attach image if available
    }

    try {
      if (isEditing) {
        // Update property if editing
        await axios.put(`http://localhost:8080/api/properties/${editPropertyId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Property updated successfully!");
      } else {
        // Add new property if not editing
        await axios.post("http://localhost:8080/api/properties", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Property added successfully!");
      }

      // Reset form and state after submission
      setNewProperty({ title: "", description: "", price: "", location: "" });
      setImage(null);
      setIsEditing(false);
      setEditPropertyId(null);
      fetchProperties(); // Refresh the property list
    } catch (error) {
      console.error("Error saving property:", error);
      toast.error("Failed to save property.");
    }
  };

  // Handle editing of a property
  const handleEdit = (property) => {
    setIsEditing(true);
    setEditPropertyId(property.id); // Store the ID of the property to edit
    setNewProperty({
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
    });
  };

  // Cancel editing mode and reset form
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditPropertyId(null);
    setNewProperty({ title: "", description: "", price: "", location: "" });
    setImage(null);
  };

  // Handle property deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/properties/${id}`);
      toast.success("Property deleted successfully!");
      fetchProperties(); // Refresh the property list
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property.");
    }
  };

  // Get the image URL from the backend
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ""; // Return empty string if no image path exists
    return `http://localhost:8080/api/files/${imagePath}`;
  };

  return (
    <div>
      <AdminNavbar />
      <div className="admin-manage-properties">
        <h1>Manage Properties</h1>
        <form onSubmit={handleSubmit} className="property-form">
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={newProperty.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProperty.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newProperty.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newProperty.location}
            onChange={handleInputChange}
          />
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
          <button type="submit">{isEditing ? "Update Property" : "Add Property"}</button>
          {isEditing && (
            <button type="button" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
          )}
        </form>

        <div className="property-list">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              {property.image ? (
                <img
                  src={getImageUrl(property.image)}
                  alt={property.title}
                  className="property-image"
                />
              ) : (
                <p>No Image Available</p>
              )}
              <div className="property-details">
                <h3><strong>property:</strong> {property.title}</h3>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Description:</strong> {property.description}</p>
                <p><strong>Price:</strong> {property.price}</p>
              </div>
              <div className="property-actions">
                <button onClick={() => handleEdit(property)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(property.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminManageProperties;

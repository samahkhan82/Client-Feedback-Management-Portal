import React, { useState } from "react";
import { submitFeedback } from "../api/feedback";
import { useNavigate } from "react-router-dom";

function FeedbackForm() {
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null); // State to hold the file
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append("category", category);
    formData.append("priority", priority);
    formData.append("description", description);
    if (file) {
      formData.append("attachment", file); // Append the file
    }

    try {
      await submitFeedback(formData, token); // Send FormData to the API
      alert("Feedback submitted successfully!");
      navigate("/dashboard"); // Redirect back to Dashboard
    } catch (error) {
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Submit Feedback</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {/* Dropdown for Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {/* File input for attachment */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 mb-4 border rounded"
        />

        <button className="p-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeedbacks } from "../api/feedback";

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await getFeedbacks(token);
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={() => navigate("/feedback")}
        className="p-2 mb-4 bg-blue-500 text-white rounded"
      >
        Submit Feedback
      </button>
      <table className="w-full bg-white shadow-md border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-center">Serial No.</th>{" "}
            {/* Serial number header */}
            <th className="border px-4 py-2 text-center">Category</th>
            <th className="border px-4 py-2 text-center">Priority</th>
            <th className="border px-4 py-2 text-center">Description</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb, index) => (
            <tr key={fb._id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>{" "}
              {/* Displaying the serial number */}
              <td className="border px-4 py-2 text-center">{fb.category}</td>
              <td className="border px-4 py-2 text-center">{fb.priority}</td>
              <td className="border px-4 py-2 text-center">{fb.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

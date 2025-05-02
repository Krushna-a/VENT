import React, { useEffect } from "react";
import axios from "axios";

const Protected = () => {
  const fetchProtectedData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/protected", {
        withCredentials: true, // Important to send session cookie
      });
      console.log(response.data); // Should include req.user and message
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };
  useEffect(() => {
    fetchProtectedData();
  });

  return <div>protected route</div>;
};

export default Protected;

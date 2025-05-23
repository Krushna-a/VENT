import React, { useEffect } from "react";
import axios from "axios";

const Protected = () => {
  const fetchProtectedData = async () => {
    try {
      const response = await axios.get("https://vent-hyfi.onrender.com/protected", {
        withCredentials: true, // Important to send session cookie
      });
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

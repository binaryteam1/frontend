import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket"; // Import the socket instance

function Category() {
  const location = useLocation();
  const [testData, setTestData] = useState([]);
 
  const handleSocketData = (data) => {
    setTestData((prevTestData) => {
      const newDataArray = Array.isArray(data) ? data : [data];
      const updatedTestData = [...prevTestData, ...newDataArray];
      // return updatedTestData;
      return data;
    });
  }

  socket.on('1', handleSocketData);
  socket.on('2', handleSocketData);
  socket.on('3', handleSocketData);

  useEffect(() => {



    return () => {
 
    };
  }, []); // Include relevant dependencies here


  return (
    <div>
      <div>Category</div>
      <div>
        <div>{JSON.stringify(testData)}</div>
        {/* Display or use the eventData as needed */}
        <p>Data received from the server:</p>
      </div>
    </div>
  );
}

export default Category;

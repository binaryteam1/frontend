import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket"; // Import the socket instance

function Category() {
  const location = useLocation();
  const [testData, setTestData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const queryData = Object.fromEntries(queryParams);

  const eventId = queryData["eventId"];
  const marketId = queryData["marketId"];
  let eventCategory = queryData['eventType']; // Make it let to be able to reassign it

  useEffect(() => {
    const handleSocketData = (data) => {
      setTestData((prevTestData) => {
        // Merge the new data with the existing data
        const updatedTestData = [...prevTestData, data];
        return updatedTestData;
      });
    }

    // Unsubscribe from the previous event category
    socket.off(eventCategory, handleSocketData);

    // Subscribe to the new event category
    if (eventCategory) {
      socket.on(eventCategory, handleSocketData);
    }
    else if (eventCategory == 3) {
      socket.on('4',handleSocketData)
    }
    else {
      // Default events if eventCategory is not specified
      socket.on('1', handleSocketData);
      socket.on('2', handleSocketData);
      socket.on('3', handleSocketData);
    }

    return () => {
      // Clean up the socket listener when the component unmounts
      socket.off(eventCategory, handleSocketData);
    };
  }, [eventCategory]);

  useEffect(() => {
    setFilteredData(filtered());
  }, [testData, eventId, marketId, eventCategory]);

  const filtered = () => {
    if (testData.length === 0) return [];

    return testData.filter((event) => {
      const market =event&&event.markets.length > 0 && event.markets[0];

      return (
        eventId&&marketId&&eventCategory?(!eventId || (market && parseFloat(market.eventId) === parseFloat(eventId))) &&
        (!marketId || (market && parseFloat(market.marketId) === parseFloat(marketId))) &&
        (!eventCategory || (market && parseFloat(market.eventType) === parseFloat(eventCategory))):eventCategory&(!eventCategory || (market && parseFloat(market.eventType) === parseFloat(eventCategory)))
      );
    });
  };

  return (
    <div>
      <div>Category</div>
      <div>
        <div>{JSON.stringify(filteredData)}</div>
        {/* Display or use the eventData as needed */}
        <p>Data received from the server:</p>
      </div>
    </div>
  );
}

export default Category;

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
  const eventCategory = queryData['eventType'];

  useEffect(() => {
    const handleSocketData = (data) => {
      setTestData((prevTestData) => {
        // Ensure data is an array
        const newDataArray = Array.isArray(data) ? data : [data];

        const isNewDataPresent = newDataArray.some(
          (newData) =>
            prevTestData &&
            prevTestData.some(
              (item) =>
                item.markets &&
                item.markets[0] &&
                newData.markets &&
                newData.markets[0] &&
                parseFloat(item.markets[0].marketId) === parseFloat(newData.markets[0].marketId) &&
                parseFloat(item.markets[0].eventId) === parseFloat(newData.markets[0].eventId) &&
                parseFloat(item.markets[0].eventType) === parseFloat(newData.markets[0].eventType)
            )
        );

        const updatedTestData = isNewDataPresent
          ? prevTestData
          : [...prevTestData, ...newDataArray]; // Using spread operator to flatten the array

        setFilteredData(updatedTestData);

        return updatedTestData;
      });
    }

    // Add event listeners for '1' to '3'
    socket.on('1', handleSocketData);
    socket.on('2', handleSocketData);
    socket.on('3', handleSocketData);

    return () => {
    };
  }, [eventId, marketId]);

  // Filter the data based on query parameters
  useEffect(() => {
    const filtered = () => {
      if (testData.length === 0) return [];

      return testData.filter((event) => {
        const market = event.markets.length > 0 && event.markets[0];

        return (
          (!eventId || (market && parseFloat(market.eventId) === parseFloat(eventId))) &&
          (!marketId || (market && parseFloat(market.marketId) === parseFloat(marketId))) &&
          (!eventCategory || (market && parseFloat(market.eventType) === parseFloat(eventCategory)))
        );
      });
    };

    setFilteredData(filtered());

  }, [filteredData,eventId, marketId, eventCategory]);

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

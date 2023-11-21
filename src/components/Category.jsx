import React, { useEffect, useState, useMemo } from "react";
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

  const filtered = useMemo(() => {
    return testData.filter((event) => {
      const market = event.markets.length > 0 && event.markets[0];

      return (
        (!eventId || (market && parseFloat(market.eventId) === parseFloat(eventId))) &&
        (!marketId || (market && parseFloat(market.marketId) === parseFloat(marketId))) &&
        (!eventCategory || (market && parseFloat(market.eventType) === parseFloat(eventCategory)))
      );
    });
  }, [testData, eventId, marketId, eventCategory]);

  useEffect(() => {
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

    return () => {
      // Cleanup socket listeners when component unmounts
      socket.off('1', handleSocketData);
      socket.off('2', handleSocketData);
      socket.off('3', handleSocketData);
    };
  }, [eventId, marketId, eventCategory]); // Include relevant dependencies here

  // Update filteredData when testData changes
  useEffect(() => {
    setFilteredData(filtered);
    console.log('rendering')
  }, [filtered]);

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

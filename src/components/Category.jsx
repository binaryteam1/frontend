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

  const filtered = (data) => {
    return data.filter((event) => {
      const market = event.markets.length > 0 && event.markets[0];

      return (
        (!eventId || (market && parseFloat(market.eventId) === parseFloat(eventId))) &&
        (!marketId || (market && parseFloat(market.marketId) === parseFloat(marketId))) &&
        (!eventCategory || (market && parseFloat(market.eventType) === parseFloat(eventCategory)))
      );
    });
  };

  const handleSocketData = (data) => {
    setTestData((prevTestData) => {
      const newDataArray = Array.isArray(data) ? data : [data];
      const updatedTestData = [...prevTestData, ...newDataArray];
      // return updatedTestData;
      return data
    });

    setFilteredData((prevFilteredData) => {
      const filter = eventId && marketId && eventCategory ? filtered(prevFilteredData) : prevFilteredData;
      return filter;
    });
  };

  useEffect(() => {
    socket.on('1', handleSocketData);
    socket.on('2', handleSocketData);
    socket.on('3', handleSocketData);

    return () => {
      // Cleanup socket listeners when component unmounts
      socket.off('1', handleSocketData);
      socket.off('2', handleSocketData);
      socket.off('3', handleSocketData);
    };
  }, [eventId, marketId, eventCategory]);

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

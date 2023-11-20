import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket"; // Import the socket instance

function Category() {
  const location = useLocation();
  const [testData, setTestData] = useState([]); // Ensure it's not initialized as an empty array
  const [filteredData, setFilteredData] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const queryData = Object.fromEntries(queryParams);

  const eventId = queryData["eventId"];
  const marketId = queryData["marketId"];
  const eventCategory = queryData['eventType'];

  useEffect(() => {
    const handleSocketData = (data) => {
      setTestData((prevTestData) => {
        const newDataArray = Array.isArray(data) ? data : [data];

        // Check if new data satisfies the filters
        const updatedTestData = newDataArray.filter((newData) => {
          const market = newData.markets.length > 0 && newData.markets[0];

          return (
            (!eventId || (market && parseFloat(market.eventId) === parseFloat(eventId))) &&
            (!marketId || (market && parseFloat(market.marketId) === parseFloat(marketId))) &&
            (!eventCategory || (market && parseFloat(market.eventType) === parseFloat(eventCategory)))
          );
        });

        if (updatedTestData.length > 0) {
          // Update state only if new data satisfies filters
          return [updatedTestData];
        } else {
          // No new data that satisfies filters, retain the previous state
          return prevTestData;
        }
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
  }, [eventId, marketId, eventCategory]);

  useEffect(() => {
    setFilteredData(filtered());
  }, [testData, eventId, marketId, eventCategory]);

  const filtered = () => {
    return testData.filter((event) => {
      const market = event.markets.length > 0 && event.markets[0];

      return (
        (!eventId || (market && parseFloat(market.eventId) === parseFloat(eventId))) &&
        (!marketId || (market && parseFloat(market.marketId) === parseFloat(marketId))) &&
        (!eventCategory || (market && parseFloat(market.eventType) === parseFloat(eventCategory)))
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

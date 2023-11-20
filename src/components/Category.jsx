import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket"; // Import the socket instance

function Category() {
  const location = useLocation();
  const [testData, setTestData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const queryData = Object.fromEntries(queryParams);

  const eventId = queryData["eventId"];
  const marketId = queryData["marketId"];
  const eventCategory = queryData['eventType'];

  const filterData = useMemo(() => {
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
        return [...prevTestData, ...newDataArray];
      });
    };

    setLoading(true);

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
    setFilteredData(filterData);
    setLoading(false); // Set loading to false after data is fetched
  }, [filterData]);

  return (
    <div>
      <div>Category</div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>{JSON.stringify(filteredData)}</div>
        )}
        <p>Data received from the server:</p>
      </div>
    </div>
  );
}

export default Category;

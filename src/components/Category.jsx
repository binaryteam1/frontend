// Category.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { socket } from "../socket";
import { addSocketData } from "../redux/reducers/dataslice"; // Import the Redux action

function Category() {
  const location = useLocation();
  const dispatch = useDispatch();
  const testData = useSelector((state) => state.data.testData);

  const [filteredData, setFilteredData] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const queryData = Object.fromEntries(queryParams);

  const eventId = queryData["eventId"];
  const marketId = queryData["marketId"];
  const eventCategory = queryData['eventType'];

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

  useEffect(() => {
    const handleSocketData = (data) => {
    
      dispatch(addSocketData(Array.isArray(data) ? data : [data]));
    };

    if (eventCategory) {
      socket.on(eventCategory.toString(), handleSocketData);
    } else {
      socket.on('1', handleSocketData);
      socket.on('2', handleSocketData);
      socket.on('3', handleSocketData);
    }

    return () => {

    };
  }, [eventId, marketId, eventCategory, dispatch]);

  useEffect(() => {
    const filterData = filtered();
    setFilteredData(filterData);
  }, [testData, eventId, marketId, eventCategory]);

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

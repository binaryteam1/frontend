import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket"; // Import the socket instance

function Single() {
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
    

    setFilteredData(data.filter((event) => {
       const market = event.markets.length > 0 && event.markets[0];
 
       return (
         (!eventId || (market && parseFloat(market.eventId) === parseFloat(eventId))) &&
         (!marketId || (market && parseFloat(market.marketId) === parseFloat(marketId))) &&
         (!eventCategory || (market && parseFloat(market.eventType) === parseFloat(eventCategory)))
       );
     }))
   }
   ;
   socket.on(eventCategory.toString(), handleSocketData);
  }, [setFilteredData]);

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

export default Single;

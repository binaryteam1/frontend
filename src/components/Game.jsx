import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket"; // Import the socket instance

function Game() {
  const location = useLocation();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryData = {};
    let eventType = "";
    let eventId = "";
    let marketId = "";

    for (let [key, value] of queryParams) {
      queryData[key] = value;
    }
    eventType = queryData["eventType"];
    eventId = queryData["eventId"];
    marketId = queryData["marketId"];
    
    // Append query parameters to the URL
    const url = `http://localhost:5000/page?${queryParams.toString()}`;
    console.log(url)

    // Make a request to the scraper endpoint on your server
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((scrapeResponse) => {
        console.log("Scrape response:", scrapeResponse);

        // Emit a socket event called 'page' with the query parameters
        socket.emit("page", queryData);

        // Listen for the 'page-response' event from the server
        const handleSocketResponse = (data) => {
          console.log("Received data from the server:", data);
          setEventData(data);
        };

        socket.on(eventType + marketId + eventType, handleSocketResponse);

        // Clean up the socket event listener when the component is unmounted
        return () => {
          
        };
      })
      .catch((error) => {
        console.log(error)
        console.error("Error making scraper request:", error);
      });
  }, [location.search]);

  return (
    <div>
      <div>Game</div>
      {eventData && (
        <div>
          {/* Display or use the eventData as needed */}
          <p>Data received from the server:</p>
          <pre>{JSON.stringify(eventData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Game;

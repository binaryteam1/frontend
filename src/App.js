import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import axios from 'axios';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Game from './components/Game';
import Category from './components/Category';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cricketrealtimedata, setCricketRealtimedata] = useState('This is Real-time data.');
  const [soccerrealtimedata, setSoccerRealtimedata] = useState('This is Real-time data.');
  const [tennisrealtimedata, setTennisRealtimedata] = useState('This is Real-time data.');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      console.log(response.data.data);
      document.getElementById("responseData").innerHTML = response.data.data;
      // You can save the username in local storage or a cookie for authentication purposes
    } catch (error) {
      console.error(error);
    }
  };

  const [isConnected, setIsConnected] = useState(socket.connected);
  

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Initial request for real-time data
    socket.emit("get-data");

    // Set up a timer to send real-time data requests every 5 seconds
    const timerId = setInterval(() => {
      socket.emit("get-data");
    }, 5000);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timerId);

    
      
      socket.on("3", (data) => {
        // Handle the received data
        setCricketRealtimedata(JSON.stringify(data))
        // Update UI or perform other actions based on the data
      });
      socket.on("1", (data) => {
        // Handle the received data
        setSoccerRealtimedata(JSON.stringify(data))
        // Update UI or perform other actions based on the data
      });
      socket.on("2", (data) => {
        // Handle the received data
        setTennisRealtimedata(JSON.stringify(data))
        // Update UI or perform other actions based on the data
      });
      
    };
  }, []);

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage cricketrealtimedata={cricketrealtimedata} soccerrealtimedata={soccerrealtimedata} tennisrealtimedata={tennisrealtimedata} />} />
        {/* <Route path='/page' element={<Game />} /> */}
        <Route path='/category' element={<Category />} />
        <Route path='/single' element={Single}/>
        
    </Routes>
    </BrowserRouter>
  );
}

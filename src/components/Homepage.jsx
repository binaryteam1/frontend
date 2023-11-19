import React, { useEffect } from 'react'

function Homepage({ cricketrealtimedata, soccerrealtimedata, tennisrealtimedata }) {
  useEffect(() => {
    
    async function fetchData() {
      await fetch('http://13.215.64.107:5000', {
        method: "GET"
      })
    }
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
    
  })
  return (
    <div className="App">
    {/* <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
    <p id='responseData'>Hello world!</p> */}
    
    <h1>Cricket Real-time Data:</h1>
    <p id='cricketrealtimeData'>{cricketrealtimedata}</p>
    <h1>Soccer Real-time Data:</h1>
    <p id='soccerrealtimeData'>{soccerrealtimedata}</p>
    <h1>Tennis Real-time Data:</h1>
    <p id='tennisrealtimeData'>{tennisrealtimedata}</p>
  </div>
  )
}

export default Homepage
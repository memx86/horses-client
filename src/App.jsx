import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("localhost:3002/");
const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [horses, setHorses] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("ticker", (data) => {
      setHorses(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("ticker");
    };
  }, []);

  const handleStart = () => {
    socket.emit("start");
  };

  return (
    <div>
      <button type="button" onClick={handleStart}>
        Start
      </button>
      {isConnected && (
        <ul>
          {horses.map(({ name, distance }) => (
            <li key={name}>
              <p>{name}</p>
              <p>{distance}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;

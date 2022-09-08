import { useState, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";

import HorseOnTrack from "./components/HorseOnTrack";

const socket = io("localhost:3002/");

const Stadium = styled.ul`
  padding: 20px;
  border: 1px solid #222;
`;

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
      {isConnected && !!horses.length && (
        <Stadium>
          {horses.map((horse) => (
            <li key={horse.name}>
              <HorseOnTrack horse={horse} />
            </li>
          ))}
        </Stadium>
      )}
    </div>
  );
};

export default App;

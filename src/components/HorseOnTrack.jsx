import { useRef } from "react";
import styled from "styled-components";

import getRandomHexColor from "../services/getRandomHexColor";

const Track = styled.div`
  position: relative;
  height: 50px;
  border-bottom: 1px solid #ccc;
`;

const Horse = styled.span`
  position: absolute;
  bottom: 0;
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #fff;
`;

const HorseOnTrack = ({ horse }) => {
  const color = useRef(getRandomHexColor()).current;
  const { name, distance } = horse;
  const position = `${distance / 10}vw`;
  return (
    <Track>
      <Horse
        style={{ backgroundColor: color, left: `calc(${position} - 90px)` }}
      >
        {name}
      </Horse>
    </Track>
  );
};
export default HorseOnTrack;

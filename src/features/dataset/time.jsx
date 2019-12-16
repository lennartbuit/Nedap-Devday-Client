import React from "react";

const Time = ({ seconds }) => {
  let hourPart = Math.floor(seconds / 3600).toString();
  let minutePart = Math.floor((seconds % 3600) / 60).toString();
  let secondPart = (seconds % 60).toString();

  return (
    <span>
      {[hourPart, minutePart, secondPart]
        .map(p => p.padStart(2, "0"))
        .join(":")}
    </span>
  );
};

export default Time;

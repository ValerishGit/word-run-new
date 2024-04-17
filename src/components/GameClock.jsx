import React, { useRef, useEffect } from "react";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";

const CountdownWrapper = ({ onComplete }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Render a countdown
    return (
      <span className="text-3xl">
        {formattedMinutes}:{formattedSeconds}
      </span>
    );
  };
  const game = useSelector((state) => state.game.game);

  return (
    <Countdown
      date={game.timeOut}
      onComplete={onComplete}
      renderer={renderer}
    />
  );
};

const MemoCountdown = React.memo(CountdownWrapper);

export default MemoCountdown;

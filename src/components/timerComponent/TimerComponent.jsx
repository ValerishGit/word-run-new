import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const TimeComponent = ({ onTimeOut }) => {
  TimeComponent.propTypes = {
    onTimeOut: PropTypes.func,
  };

  // Your useEffect for key presses

  // Your timer logic
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div className="timer">
        <div className="text-2xl">{remainingTime}</div>
      </div>
    );
  };

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        duration={30}
        strokeWidth={4}
        trailColor="#242555"
        size={80}
        colors={["#FFB74D", "#FFB74D", "#FF5E4D", "#FF5E4D"]}
        colorsTime={[30, 20, 10, 0]}
        onComplete={onTimeOut}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default TimeComponent;

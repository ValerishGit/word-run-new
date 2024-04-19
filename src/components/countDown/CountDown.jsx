import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CountdownComponent = ({ onComplete, duration }) => {
  CountdownComponent.propTypes = {
    onComplete: PropTypes.func,
    duration: PropTypes.number,
  };
  const [count, setCount] = useState(duration);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count > 0) {
        setCount(count - 1);
        setVisible((prevVisible) => !prevVisible); // Toggle visibility
      } else {
        // Run your function when countdown reaches 0
        setCount("Start");
        onComplete();
      }
    }, 1100);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-20">
        <h3 className="text-2xl">Get Ready</h3>
        <div
          className={`text-5xl font-bold text-orange-300  ${
            visible ? "animate-fade-in" : "animate-fade-out"
          }`}
        >
          {count == 0 ? "Start" : count}
        </div>
        <h3 className="text-2xl">To Type</h3>
      </div>
    </div>
  );
};

export default CountdownComponent;

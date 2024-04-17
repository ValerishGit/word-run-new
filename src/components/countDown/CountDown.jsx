import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CountdownComponent = ({onComplete}) => {
    CountdownComponent.propTypes ={
        onComplete: PropTypes.func
    }
    const [count, setCount] = useState(3);
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (count > 0) {
            setCount(count - 1);
            setVisible(prevVisible => !prevVisible); // Toggle visibility

        } else {
          // Run your function when countdown reaches 0
          console.log("Countdown reached 0!");
          setCount("Start")
          onComplete();
        }
      }, 1100);
  
      return () => clearTimeout(timer);
    }, [count]);
  
    return (
      <div className="flex justify-center items-center ">
          <div className={`text-8xl font-bold text-orange-300  ${visible ? 'animate-fade-in' : 'animate-fade-out'}`}>
            {count == 0 ? "Start" : count}
          </div>
     
      </div>
    );
  }
  
  export default CountdownComponent;
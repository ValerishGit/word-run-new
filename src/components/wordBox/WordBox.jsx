import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import MemoCountdown from "../GameClock";

const WordBox = ({ isHardMode, onCorrect, onTimeOut }) => {
  WordBox.propTypes = {
    isHardMode: PropTypes.bool,
    onTimeOut: PropTypes.func,
    onCorrect: PropTypes.func,
  };
  const game = useSelector((state) => state.game.game);
  const [expectedIndex, setExpectedIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [typedLetters, setTypedLetters] = useState(
    Array(game.currentWord.length).fill(false)
  );

  const handleKeyPress = useCallback((event) => {
    let inputLetter;
    if (typeof event === "string") {
      inputLetter = event.toLowerCase();
    } else {
      inputLetter = event.key.toLowerCase();
    }
    const expectedLetter = game.currentWord[expectedIndex].toLowerCase();
    console.log(isHardMode)
    if (inputLetter === expectedLetter) {
      const newTypedLetters = [...typedLetters];
      newTypedLetters[expectedIndex] = true;
      setTypedLetters(newTypedLetters);
      setExpectedIndex((prevIndex) => prevIndex + 1);
      if ("vibrate" in navigator) {
        navigator.vibrate(10); // Adjust the duration of vibration as needed (in milliseconds)
      }
      if (expectedIndex === game.currentWord.length - 1) {
        setIsCorrect(true);
        setTimeout(() => {
          setExpectedIndex(0);
          setTypedLetters([]);
          onCorrect();
          setIsCorrect(false);
        }, 400);
      }
    } else if (isHardMode) {
      if ("vibrate" in navigator) {
        navigator.vibrate(30); // Adjust the duration of vibration as needed (in milliseconds)
      }
      setExpectedIndex(0); // Reset expectedIndex if typed incorrectly
      setTypedLetters(Array(game.currentWord.length).fill(false)); // Reset typedLetters if typed incorrectly
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="h-[80%] flex flex-col justify-between items-center">
      <div className="flex justify-center items-center w-full max-w-full overflow-hidden gap-1.5">
        {game.currentWord.split("").map((letter, index) => (
          <div
            key={index + "_word"}
            style={{
              background: typedLetters[index]
                ? !isCorrect
                  ? "rgb(244, 182, 88)"
                  : "rgb(102,255,102)"
                : "transparent",
            }}
            className={`flex justify-center items-center p-0.5 lg:w-[4rem] lg:h-[4rem] w-[2.5rem] h-[2.5rem] md:min-w-[1.8rem] md:min-h-[3rem] ${
              isCorrect ? "border-transparent" : "border-orange-300"
            }  border-2 rounded-lg`}
          >
            <span
              className={`font-bold text-xl px-1 inline-block`}
              style={{
                color: typedLetters[index]
                  ? !isCorrect
                    ? "black"
                    : "black"
                  : "grey",
              }}
            >
              {letter.toUpperCase()}
            </span>

          </div>
        ))}
      </div>
      <p>{game.isHardMode ? "Hard Mode" : ""}</p>

      <br></br>
      <br></br>
      <br></br>
      <MemoCountdown onComplete={onTimeOut}></MemoCountdown>
      <br></br>
      <Keyboard
        onKeyReleased={(val) => handleKeyPress(val)}
        physicalKeyboardHighlight={true}
        physicalKeyboardHighlightPress={true}
        
        physicalKeyboardHighlightPressUseClick={true}
        physicalKeyboardHighlightBgColor={"lightgreen"}
        theme={"hg-theme-default myTheme1"}
        layoutName={"default"}
        layout={{
          default: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            " z x c v b n m ",
          ],
        }}
      />
    </div>
  );
};

export default WordBox;

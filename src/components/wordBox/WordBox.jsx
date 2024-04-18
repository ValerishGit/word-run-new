import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import MemoCountdown from "../GameClock";

const WordBox = ({isHardMode,onCorrect,onTimeOut}) => {
  WordBox.propTypes = {
    isHardMode : PropTypes.bool,
    onTimeOut:PropTypes.func,
    onCorrect:PropTypes.func
  }
  const game = useSelector((state) => state.game.game);
  const [expectedIndex, setExpectedIndex] = useState(0);

  const [typedLetters, setTypedLetters] = useState(
    Array(game.currentWord.length).fill(false)
  );

  const handleKeyPress = useCallback((event) => {

    let inputLetter;
    if (typeof event === 'string')
    {
      inputLetter = event.toLowerCase();
    }else{
      inputLetter = event.key.toLowerCase();
    }
    const expectedLetter = game.currentWord[expectedIndex].toLowerCase();

    if (inputLetter === expectedLetter) {
      const newTypedLetters = [...typedLetters];
      newTypedLetters[expectedIndex] = true;
      setTypedLetters(newTypedLetters);
      setExpectedIndex((prevIndex) => prevIndex + 1);
      if ("vibrate" in navigator) {
        navigator.vibrate(10); // Adjust the duration of vibration as needed (in milliseconds)
      }
      if (expectedIndex === game.currentWord.length - 1) {
        console.log(expectedIndex,game.currentWord.length -1)
        console.log("Answered Correctly")
        setExpectedIndex(0);
        setTypedLetters([])
        onCorrect();

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
    <div className="flex flex-col md:justify-center justify-center gap-24  items-center h-screen">
      <div
        className="bg-darkblue-800 rounded-lg py-6 px-8  border-orange-300 border  drop-shadow-none mx-auto "
        style={{ width: "90%" }}
      >
        {game.currentWord.split("").map((letter, index) => (
          <span
            key={index}
            className={`font-bold text-3xl px-1  inline-block`}
            style={{ color: typedLetters[index] ? "orange" : "white" }}
          >
            {index == 0 ? letter.toUpperCase(): letter.toLowerCase()}
          </span>
        ))}
      </div>
      <MemoCountdown onComplete={onTimeOut}></MemoCountdown>
      <Keyboard
        onKeyReleased={(val=> handleKeyPress(val))}
        physicalKeyboardHighlight={true}
        physicalKeyboardHighlightPress={true}
        physicalKeyboardHighlightPressUseClick={true}
        physicalKeyboardHighlightBgColor="white"
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

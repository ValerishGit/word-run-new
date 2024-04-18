import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScore } from "../../store/slice";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const WordBox = ({isHardMode,onCorrect}) => {
  WordBox.propTypes = {
    isHardMode : PropTypes.bool,
    onCorrect:PropTypes.func
  }
  const dispatch = useDispatch();
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

      if (expectedIndex === game.currentWord.length - 1) {
        console.log(expectedIndex,game.currentWord.length -1)
        console.log("Answered Correctly")
        setExpectedIndex(0);
        setTypedLetters([])
        onCorrect();

      }
    } else if (isHardMode) {
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
    <div className="flex flex-col md:justify-between justify-center gap-10 p-4 items-center h-screen">
      <div
        className="bg-darkblue-800 rounded-lg py-6 px-8  border-orange-300 border  drop-shadow-none mx-auto "
        style={{ width: "90%" }}
      >
        {game.currentWord.split("").map((letter, index) => (
          <span
            key={index}
            className={`font-bold text-3xl  inline-block`}
            style={{ color: typedLetters[index] ? "orange" : "white" }}
          >
            {index == 0 ? letter.toUpperCase(): letter.toLowerCase()}
          </span>
        ))}
      </div>
      <br></br>
      <Keyboard
        onKeyPress={(val) => handleKeyPress(val)}
        useMouseEvents={true}
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
            "z x c v b n m",
            "{space}"
          ],
        }}
      />
    </div>
  );
};

export default WordBox;

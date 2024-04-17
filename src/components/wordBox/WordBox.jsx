import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScore, changeWord } from "../../store/slice";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const WordBox = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game.game);
  const [expectedIndex, setExpectedIndex] = useState(0);

  const [typedLetters, setTypedLetters] = useState(
    Array(game.currentWord.length).fill(false)
  );

  const onWordTypedCorrectly = () => {
    setExpectedIndex(0);
    dispatch(addScore());
    setTypedLetters(Array(game.currentWord.length).fill(false));
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [typedLetters, game.currentWord, expectedIndex, onWordTypedCorrectly]);

  const handleKeyPress = (event) => {
    const inputLetter = event.toLowerCase();
    const expectedLetter = game.currentWord[expectedIndex].toLowerCase();

    if (inputLetter === expectedLetter) {
      const newTypedLetters = [...typedLetters];
      newTypedLetters[expectedIndex] = true;
      setTypedLetters(newTypedLetters);
      setExpectedIndex((prevIndex) => prevIndex + 1);

      if (expectedIndex === game.currentWord.length - 1) {
        onWordTypedCorrectly();
        setTypedLetters(Array(game.currentWord.length).fill(false)); // Reset typedLetters for the next word
        setExpectedIndex(0); // Reset expectedIndex for the next word
      }
    } else if (isHardMode) {
      setExpectedIndex(0); // Reset expectedIndex if typed incorrectly
      setTypedLetters(Array(game.currentWord.length).fill(false)); // Reset typedLetters if typed incorrectly
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div
        className="bg-darkblue-800 rounded-lg py-6 px-8 w-[80%]  border-orange-300 border  drop-shadow-none mx-auto "
        style={{ width: "80%" }}
      >
        {game.currentWord.split("").map((letter, index) => (
          <span
            key={index}
            className={`font-bold text-3xl  inline-block`}
            style={{ color: typedLetters[index] ? "white" : "grey" }}
          >
            {letter.toUpperCase()}
          </span>
        ))}
      </div>
      <Keyboard
        onKeyPress={(val) => handleKeyPress(val)}
        physicalKeyboardHighlightTextColor="red"
        theme={"hg-theme-default myTheme1"}
        layoutName={"default"}
        layout={{
          default: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            " Z X C V B N M ",
          ],
        }}
      />
    </div>
  );
};

export default WordBox;

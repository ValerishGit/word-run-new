import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { addScore, changeWord } from "../../store/slice";

const words = [
  "apple",
  "moose",
  "door",
  "workfsfdasd",
  "homesadfasf",
  "wife",
  "dog",
];

const WordBox = () => {


  const dispatch = useDispatch();
  const game = useSelector((state)=>state.game.game);
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
    const handleKeyPress = (event) => {
      const inputLetter = event.key.toLowerCase();
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

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [typedLetters, game.currentWord, expectedIndex, onWordTypedCorrectly]);

  return (
    <div className="bg-darkblue-800 rounded-lg py-6 px-8 min-w-[50vw] border-orange-300 border  drop-shadow-none mx-auto ">
      {game.currentWord.split("").map((letter, index) => (
        <span
          key={index}
          className={`font-bold text-2xl px-1 inline-block`}
          style={{ color: typedLetters[index] ? "white" : "grey" }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default WordBox;

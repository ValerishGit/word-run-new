import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const words = [
  "apple",
  "moose",
  "door",
  "workfsfdasd",
  "homesadfasf",
  "wife",
  "dog",
];

const WordBox = ({ onCorrect }) => {
  WordBox.propTypes = {
    onCorrect: PropTypes.func,
  };
  const [expectedIndex, setExpectedIndex] = useState(0);
  const [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [typedLetters, setTypedLetters] = useState(
    Array(word.length).fill(false)
  );

  const onWordTypedCorrectly = () => {
    setExpectedIndex(0);

    setWord(words[Math.floor(Math.random() * words.length)]);
    setTypedLetters(Array(word.length).fill(false));
    //onCorrect(word.length);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const inputLetter = event.key.toLowerCase();
      const expectedLetter = word[expectedIndex].toLowerCase();

      if (inputLetter === expectedLetter) {
        const newTypedLetters = [...typedLetters];
        newTypedLetters[expectedIndex] = true;
        setTypedLetters(newTypedLetters);
        setExpectedIndex((prevIndex) => prevIndex + 1);

        if (expectedIndex === word.length - 1) {
          onWordTypedCorrectly();
          setTypedLetters(Array(word.length).fill(false)); // Reset typedLetters for the next word
          setExpectedIndex(0); // Reset expectedIndex for the next word
        }
      } else if (isHardMode) {
        setExpectedIndex(0); // Reset expectedIndex if typed incorrectly
        setTypedLetters(Array(word.length).fill(false)); // Reset typedLetters if typed incorrectly
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [typedLetters, word, expectedIndex, onWordTypedCorrectly]);

  return (
    <div className="bg-darkblue-800 rounded-lg py-6 px-8 min-w-[50vw] border-orange-300 border  drop-shadow-none mx-auto ">
      {word.split("").map((letter, index) => (
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

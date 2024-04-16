import { useNavigate } from "react-router-dom";
import CountdownComponent from "../countDown/CountDown";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

const words = ['apple','moose',"door","workfsfdasd","homesadfasf",'wife',"dog"]

export const GameScreen = () => {
    const [isStart, setIsStart] = useState(false);
    const [currentWord, setCurrentWord] = useState(words[Math.floor(Math.random() * words.length)]);
    const [typedLetters, setTypedLetters] = useState(Array(currentWord.length).fill(false));
    const [expectedIndex, setExpectedIndex] = useState(0);

    const navigateTo = useNavigate();

    const endGame = () => {
        navigateTo('/');
    };


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onWordTypedCorrectly = () =>{
        console.log("Word Typed")
        setCurrentWord(words[Math.floor(Math.random() * words.length)])
        setTypedLetters(Array(currentWord.length).fill(false));
    }
    
    useEffect(() => {
        const handleKeyPress = (event) => {
            const inputLetter = event.key.toLowerCase();
            const expectedLetter = currentWord[expectedIndex].toLowerCase();
      
            if (inputLetter === expectedLetter) {
              const newTypedLetters = [...typedLetters];
              newTypedLetters[expectedIndex] = true;
              setTypedLetters(newTypedLetters);
              setExpectedIndex(prevIndex => prevIndex + 1);
      
              if (expectedIndex === currentWord.length - 1) {
                onWordTypedCorrectly();
                setTypedLetters(Array(currentWord.length).fill(false)); // Reset typedLetters for the next word
                setExpectedIndex(0); // Reset expectedIndex for the next word
              }
            } else {
              setExpectedIndex(0); // Reset expectedIndex if typed incorrectly
              setTypedLetters(Array(currentWord.length).fill(false)); // Reset typedLetters if typed incorrectly
            }
          };
      
    
        document.addEventListener('keydown', handleKeyPress);
    
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [typedLetters, currentWord, expectedIndex, onWordTypedCorrectly]);



    const RoundedBox = ({ word }) => {
        RoundedBox.propTypes = {
            word: PropTypes.string
        };
        return ( 
             <div className="bg-darkblue-800 rounded-lg py-6 w-[70vw]  border-orange-300 border  drop-shadow-none mx-auto ">
            {word.split('').map((letter, index) => (
              <span key={index} className={`font-bold text-2xl px-1 inline-block`} style={{ color: typedLetters[index] ? 'white' : 'grey' }}>
                {letter}
              </span>
            ))}
          </div>
  
           
        );
    };


    const onTimerCompleted = () => {
        setIsStart(tempisStart => !tempisStart);
    };

    return (
        <div className="">
            {!isStart ? <CountdownComponent onComplete={onTimerCompleted}></CountdownComponent> : <div className="flex flex-col justify-center items-center gap-5 min-w-[300px] max-w-[50vw]">
            <RoundedBox word={currentWord}/>
            </div>}
        </div>
    );
};

export default GameScreen
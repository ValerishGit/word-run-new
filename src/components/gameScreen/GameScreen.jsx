import { useNavigate } from "react-router-dom";
import CountdownComponent from "../countDown/CountDown";
import {useDispatch,useSelector} from "react-redux";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import GlowingButton from "../glowingButton/GlowingButton";
import TimeComponent from "../timerComponent/TimerComponent";
import WordBox from "../wordBox/WordBox";
import { changeWord, startGame } from "../../store/slice";

export const GameScreen = ({ isHardMode }) => {
    GameScreen.propTypes = {
        isHardMode : PropTypes.bool
    }
  const dispatch = useDispatch();
  const game = useSelector((state)=>state.game.game);
  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const navigateTo = useNavigate();

  const backHome = () => {
    navigateTo("/");
  };


  // eslint-disable-next-line react-hooks/exhaustive-deps

  const onTimerCompleted = () => {
    dispatch(startGame({
        id:1,numOfPlayers:1,isHardMode:false,score:0,currentWord:"Example",isRunning:true,finalScore:0
    }))
  };

  const onTimeOut = () => {
    setIsGameOver(true);
  };


  const restartGame = () => {
    setIsGameOver(false);
    setScore(0);
  };

  const GameOverSection = () => {
    return (
      <div className="flex flex-col gap-5">
        <h1>
          Game <span className="text-orange-300">Over</span>
        </h1>
        <h1>{score}</h1>
        <div className="flex flex-col md:flex-row  gap-5 items-center justify-center">
          <GlowingButton onClick={restartGame}>Try Again</GlowingButton>
          <GlowingButton onClick={backHome}>Back</GlowingButton>
        </div>
      </div>
    );
  };



  const MainGameScreen = () => {
      useEffect(() => {
        // Add the bounce animation class whenever score changes
        const scoreText = document.getElementById('score-text');
        scoreText.classList.add('animate-bounce');

        setTimeout(()=>{
            scoreText.classList.remove('animate-bounce');
        },500)
      }, [game.score]);
    return !isGameOver ? (
      <div className="flex flex-col h-screen w-[60vw] justify-evenly items-stretch">
        <p id={"score-text"} className="font-bold text-8xl text-gray-700 ease-linear">{game.score}</p>
        <WordBox></WordBox>
        <div className="h-[50vh]"></div>
      </div>
    ) : (
      <GameOverSection></GameOverSection>
    );
  };

  return (
    <div>
      {!game.isRunning ? (
        <CountdownComponent onComplete={onTimerCompleted}></CountdownComponent>
      ) : (
        <MainGameScreen></MainGameScreen>
      )}
    </div>
  );
};

export default GameScreen;

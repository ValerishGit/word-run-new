import { useNavigate } from "react-router-dom";
import CountdownComponent from "../countDown/CountDown";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useState } from "react";
import GlowingButton from "../glowingButton/GlowingButton";
import WordBox from "../wordBox/WordBox";
import { addScore, gameOver, startGame } from "../../store/slice";
import ScoreComponent from "../scoreComponent/ScoreComponent";
import MemoCountdown from "../GameClock";

export const GameScreen = ({ isHardMode }) => {
  GameScreen.propTypes = {
    isHardMode: PropTypes.bool,
  };
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game.game);
  const [isGameOver, setIsGameOver] = useState(false);

  const navigateTo = useNavigate();

  const backHome = () => {
    navigateTo("/");
    dispatch(gameOver());
    setIsGameOver(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const onTimerCompleted = () => {
    dispatch(
      startGame({
        id: 1,
        numOfPlayers: 1,
        isHardMode: false,
        score: 0,
        currentWord: "Example",
        isRunning: true,
        finalScore: 0,
        timeOut: Date.now() + 30 * 1000,
      })
    );
  };

  const onTimeOut = () => {
    setIsGameOver(true);
  };

  const onCorrect = ()=>{
    console.log("Add Points");
    dispatch(addScore());
  }

  const restartGame = () => {
    setIsGameOver(false);
    dispatch(
      startGame({
        id: 1,
        numOfPlayers: 1,
        isHardMode: false,
        score: 0,
        currentWord: "Example",
        isRunning: true,
        finalScore: 0,
        timeOut: Date.now() + 30 * 1000,
      })
    );
  };

  const GameOverSection = () => {
    return (
      <div className="flex flex-col gap-5">
        <h1>
          Game <span className="text-orange-300">Over</span>
        </h1>
        <h1 >{game.score}</h1>
        <div className="flex flex-col md:flex-row  gap-5 items-center justify-center">
          <GlowingButton onClick={restartGame}>Try Again</GlowingButton>
          <GlowingButton onClick={backHome}>Back</GlowingButton>
        </div>
      </div>
    );
  };

  const MainGameScreen = () => {
    return !isGameOver ? (
      <div className="flex flex-col h-screen justify-evenly items-stretch">
      <h1 className="text-2xl font-extrabold text-center">Word<span className='text-orange-400'>Run</span></h1>
      <br></br>
        <ScoreComponent></ScoreComponent>
        <WordBox onCorrect={onCorrect} isHardMode={isHardMode} onTimeOut={onTimeOut}></WordBox>
      </div>
    ) : (
      <GameOverSection></GameOverSection>
    );
  };

  return (
    <div>
      {!game.isRunning ? (
        <CountdownComponent
          duration={3}
          onComplete={onTimerCompleted}
        ></CountdownComponent>
      ) : (
        <div>
          <MainGameScreen></MainGameScreen>
        </div>
      )}
    </div>
  );
};

export default GameScreen;

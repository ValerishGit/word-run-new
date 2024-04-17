import { useNavigate } from "react-router-dom";
import CountdownComponent from "../countDown/CountDown";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import GlowingButton from "../glowingButton/GlowingButton";
import TimeComponent from "../timerComponent/TimerComponent";
import WordBox from "../wordBox/WordBox";

export const GameScreen = ({ isHardMode }) => {
  const [isStart, setIsStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameClock, setGameClock] = useState(30);

  const [score, setScore] = useState(0);
  const navigateTo = useNavigate();

  const backHome = () => {
    navigateTo("/");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const onTimerCompleted = () => {
    setIsStart((tempisStart) => !tempisStart);
  };

  const onTimeOut = () => {
    setIsGameOver(true);
  };

  const addScore = (lenght) => {
    let mult = lenght * 2;
    setScore((prevScore) => prevScore + mult);
  };

  const restartGame = () => {
    setIsGameOver(false);
    setIsStart(false);
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
    return !isGameOver ? (
      <div className="flex flex-col h-screen w-[60vw] justify-evenly items-stretch">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-evenly ">
          <TimeComponent
            gameClock={gameClock}
            onTimeOut={onTimeOut}
          ></TimeComponent>
          <p className="font-bold text-3xl">{score}</p>
        </div>
        <WordBox onCorrect={addScore}></WordBox>
        <div className="h-[40vh]"></div>
      </div>
    ) : (
      <GameOverSection></GameOverSection>
    );
  };

  return (
    <div>
      {!isStart ? (
        <CountdownComponent onComplete={onTimerCompleted}></CountdownComponent>
      ) : (
        <MainGameScreen></MainGameScreen>
      )}
    </div>
  );
};

export default GameScreen;

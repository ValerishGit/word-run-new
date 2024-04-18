import { useSelector, useDispatch } from "react-redux";
import GlowingButton from "../glowingButton/GlowingButton";
import Modal from "../modalsheet/CustomModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetGame } from "../../store/slice";

const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const game = useSelector((state) => state.game.game);
  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const startGame = () => {
    dispatch(resetGame());
    navigateTo("/game-run");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-24 ">
      <div>
        <h1 className="text-6xl font-extrabold text-center animate-bounce">
          Word<span className="text-orange-400">Run</span>
        </h1>
        <p className="text-lg font-light text-center text-orange-300 ">
          How fast can you type?
        </p>
        <p className="text-md font-light text-center text-white ">
          Best:{game.bestScore}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <GlowingButton onClick={startGame}>Start Game</GlowingButton>
        <GlowingButton onClick={openModal}>How to Play</GlowingButton>
        <Modal isModalOpen={isModalOpen} onClose={closeModal} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs">Early Test V0.0.1</span>
        <span className="text-xs text-orange-300">support@word-run.com</span>
      </div>
    </div>
  );
};

export default HomeScreen;

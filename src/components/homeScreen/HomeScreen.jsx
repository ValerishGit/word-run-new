import GlowingButton from '../glowingButton/GlowingButton';
import Modal from '../modalsheet/CustomModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigateTo = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const startGame = ()=>{
    navigateTo('/game-run')
}

  return (
    <div className="p-4 flex flex-col justify-center items-center gap-24">
      <div>
      <h1 className="text-6xl font-extrabold text-center animate-bounce">Word<span className='text-orange-400'>Run</span></h1>
      <p className="text-lg font-light text-center text-orange-300 ">How fast can you type?</p>
      </div>

      <div className='flex flex-col gap-4'>
        <GlowingButton onClick={startGame} >Start Game</GlowingButton>
        <GlowingButton onClick={openModal}>How to Play</GlowingButton>
        <Modal isModalOpen={isModalOpen}  onClose={closeModal} />
        <p className='text-xs'>Early Test Version</p>
      </div>
    </div>
  );

}

export default HomeScreen;
import { useNavigate } from "react-router-dom";
import GlowingButton from "../glowingButton/GlowingButton";

const GameScreen = () => {
    const navigateTo = useNavigate();
    const endGame = ()=>{
        navigateTo('/')
    }

    const RoundedBox = () => {
        return (
          <div className=" bg-gray-800 rounded-lg p-8 w-full  mx-auto">
            <span className="font-bold text-2xl">Example</span>
          </div>
        );
      };



  return (
    <div className="flex flex-col justify-center min-w-[300px] max-w-[50vw]   gap-20 items-center">
        <RoundedBox></RoundedBox>
        <GlowingButton onClick={endGame}>Back</GlowingButton>
    </div>
  );
}
export default GameScreen;



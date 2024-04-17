import { useSelector } from "react-redux";

const ScoreComponent = () => {
  const game = useSelector((state) => state.game.game);

  return (
    <p className="font-bold text-8xl text-gray-700 ease-linear">{game.score}</p>
  );
};

export default ScoreComponent;

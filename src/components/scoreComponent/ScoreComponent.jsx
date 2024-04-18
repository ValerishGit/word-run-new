import { useSelector } from "react-redux";

const ScoreComponent = () => {
  const game = useSelector((state) => state.game.game);

  return (
    <p className="font-bold text-5xl text-orange-100 ease-linear">{game.score}</p>
  );
};

export default ScoreComponent;

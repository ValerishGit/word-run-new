
import './App.css'
import { BrowserRouter as Router,  Routes ,Route  } from 'react-router-dom';
import HomeScreen from './components/homeScreen/HomeScreen';
import GameScreen from './components/gameScreen/GameScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeScreen/>} />
        <Route exact path="/game-run" element={<GameScreen/>} />
      </Routes>
    </Router>
  );


}

export default App

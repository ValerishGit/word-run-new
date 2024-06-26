import { createSlice } from "@reduxjs/toolkit";

const words = [
  "banana",
  "orange",
  "coffee",
  "bottle",
  "rocket",
  "laptop",
  "pencil",
  "paper",
  "turtle",
  "rabbit",
  "monkey",
  "cookie",
  "guitar",
  "butter",
  "muffin",
  "camera",
  "soccer",
  "hockey",
  "garden",
  "window",
  "cloudy",
  "sunset",
  "summer",
  "winter",
  "spring",
  "fall",
  "cricket",
  "chicken",
  "cheese",
  "grapes",
  "pickle",
  "rocket",
  "tissue",
  "marker",
  "planet",
  "diamond",
  "circle",
  "square",
  "triangle",
  "octagon",
  "rainbow",
  "lizard",
  "mantis",
  "giraffe",
  "elephant",
  "penguin",
  "leopard",
  "tiger",
  "lion",
  "zebra",
  "hippo",
  "kangaroo",
  "koala",
  "panda",
  "hamster",
  "rabbit",
  "mouse",
  "monkey",
  "squirrel",
  "whale",
  "shark",
  "dolphin",
  "seagull",
  "pelican",
  "eagle",
  "hawk",
  "parrot",
  "peacock",
  "owl",
  "robin",
  "sparrow",
  "crow",
  "duck",
  "goose",
  "swan",
  "crane",
  "pigeon",
  "hawk",
  "turkey",
  "vulture",
  "raven",
  "hummingbird",
  "woodpecker",
  "stork",
  "bluejay",
  "canary",
  "finch",
  "warbler",
  "oriole",
  "kingfisher",
  "wren",
  "kiwi"
];

const initialState = {
  game: {
    id: 123123321,
    numOfPlayers: 1,
    isHardMode: false,
    score: 0,
    currentWord:words[Math.floor(Math.random() * words.length)],
    isRunning: false,
    finalScore: 0,
    bestScore: localStorage.getItem('bestScore') || 0,
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame:(state,action)=>{
      const newGame = action.payload;
      newGame.currentWord =  words[Math.floor(Math.random() * words.length)],

      state.game = newGame;
    },
    startGame: (state, action) => {
      const newGame = action.payload;
      newGame.currentWord =  words[Math.floor(Math.random() * words.length)],
      state.game = newGame;
    },
    addScore: (state, action) => {
      state.game.score += state.game.currentWord.length;

      state.game.currentWord = words[Math.floor(Math.random() * words.length)];
     
    },
    gameOver: (state, action) => {
      if (state.game.score > state.game.bestScore) {
        state.game.bestScore = action.payload;
        localStorage.setItem('bestScore', state.game.score); // Save bestScore to local storage
      }
    },
    changeWord: (state, action) => {},
  },
});

export const { startGame, addScore, gameOver, changeWord,resetGame} = gameSlice.actions;

export default gameSlice.reducer;

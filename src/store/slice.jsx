import {createSlice} from "@reduxjs/toolkit"

const words = [
    "apple",
    "moose",
    "door",
    "workfsfdasd",
    "homesadfasf",
    "wife",
    "dog",
  ];

const initialState = {
    game:{
        id:123123321,numOfPlayers:1,isHardMode:false,score:0,currentWord:"Example",isRunning:false,finalScore:0
    }
}

export const gameSlice = createSlice({
    name:"game",
    initialState,
    reducers:{
        startGame:(state,action)=>{
            const newGame = action.payload;
            state.game = newGame;
        },
        addScore:(state,action)=>{
            state.game.score += state.game.currentWord.length;
            state.game.currentWord = words[Math.floor(Math.random() * words.length)];

        },
        gameOver:(state,action)=>{
            state.game.finalScore = action.payload;
            state.game.isRunning = false;
        },
        changeWord:(state,action)=>{
        }

    }
});


export const {startGame,addScore,gameOver,changeWord} = gameSlice.actions;

export default gameSlice.reducer;
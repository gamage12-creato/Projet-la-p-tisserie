import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dices: Array(5).fill(null), // Valeurs des dés
  lockedDices: Array(5).fill(false), // Dés verrouillés
  attempts: 3, // Nombre d'essais restants
  firstRollDone: false, // Permet de verrouiller après le premier lancer
};

const gameDice = createSlice({
  name: "game",
  initialState,
  reducers: {
    rollDices: (state, action) => {
      const { newDices, lockedDices } = action.payload;
      state.dices = newDices;
      state.lockedDices = lockedDices;
      state.attempts -= 1;
      state.firstRollDone = true;
    },
    toggleLockDice: (state, action) => {
      if (state.firstRollDone) {
        state.lockedDices[action.payload] = !state.lockedDices[action.payload];
      }
    },
    saveGameProgress: (state, action) => {
      const { dices, lockedDices, attempts, firstRollDone } = action.payload;
      state.dices = dices;
      state.lockedDices = lockedDices;
      state.attempts = attempts;
      state.firstRollDone = firstRollDone;
    },
    resetGame: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { rollDices, toggleLockDice, saveGameProgress, resetGame } = gameDice.actions;
export default gameDice.reducer;

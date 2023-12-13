import { createReducer } from '@reduxjs/toolkit';
import { Battle } from '../../models/interfaces/monster.interface';
import { fetchBattle } from './battle.actions';

interface BattleState {
  battle: Battle | null;
}

const initialState: BattleState = {
  battle: null,
};

export const battleReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchBattle.pending, (state) => ({
    ...state,
    battle: null,
  }));

  builder.addCase(fetchBattle.rejected, (state) => ({
    ...state,
    battle: null,
  }));

  builder.addCase(fetchBattle.fulfilled, (state, action) => ({
    ...state,
    battle: action.payload,
  }));
});

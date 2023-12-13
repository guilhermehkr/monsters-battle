import { createAsyncThunk } from '@reduxjs/toolkit';
import { Battle } from '../../models/interfaces/monster.interface';
import { BattleService } from './battle.service';

export const fetchBattle = createAsyncThunk<
  Battle,
  {
    firstMonsterId?: string;
    secondMonsterId?: string;
  }
>('battle/fetchBattle', BattleService.battle);

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
import { fetchBattle } from '../../reducers/battle/battle.actions';
import {
  selectMonsters,
  selectSelectedMonster,
  selectOpponentMonster,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.styled';
import { Alert } from '@mui/material';
import { selectWinner } from '../../reducers/battle/battle.selectors';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);
  const opponentMonster = useSelector(selectOpponentMonster);

  const winner = useSelector(selectWinner);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, [dispatch]);

  const handleStartBattleClick = () => {
    dispatch(
      fetchBattle({
        firstMonsterId: selectedMonster?.id,
        secondMonsterId: opponentMonster?.id,
      }),
    );
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />
      {winner && (
        <Alert icon={false} severity="info">
          {winner.name} wins
        </Alert>
      )}
      <BattleSection>
        <MonsterBattleCard
          defaultTitle="Player"
          monster={selectedMonster}></MonsterBattleCard>
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          defaultTitle="Computer"
          monster={opponentMonster}></MonsterBattleCard>
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };

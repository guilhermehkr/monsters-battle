import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Monster } from '../../models/interfaces/monster.interface';
import {
  setOpponentMonster,
  setSelectedMonster,
} from '../../reducers/monsters/monsters.actions';
import {
  Image,
  ListTitle,
  MonsterCard,
  MonsterName,
  MonstersSection,
} from './MonstersList.styled';
import { getRandomArrayPosition } from '../utils';

type MonstersListProps = {
  monsters: Monster[];
};

const getRandomMonster = (
  monsters: Monster[],
  selectedMonsterId: string | null,
): Monster => {
  const selectedMonsterIndex = monsters.findIndex(
    (monster) => monster.id === selectedMonsterId,
  );
  return monsters[
    getRandomArrayPosition(monsters.length, selectedMonsterIndex)
  ];
};

const MonstersList: React.FC<MonstersListProps> = ({ monsters }) => {
  const dispatch = useAppDispatch();

  const [selectedMonsterId, setSelectedMonsterId] = useState<string | null>(
    null,
  );

  const handleMonsterClick = (monster: Monster) => {
    const value = selectedMonsterId === monster.id ? null : monster.id;
    setSelectedMonsterId(value);
    dispatch(setSelectedMonster(!value ? null : monster));

    const opponentMonster = getRandomMonster(monsters, value);
    dispatch(setOpponentMonster(!value ? null : opponentMonster));
  };

  return (
    <div>
      <ListTitle>
        {monsters.length > 0 ? 'Select your monster' : 'No monsters available'}
      </ListTitle>

      <MonstersSection data-testid="monsters-list-section">
        {monsters.map((monster) => (
          <MonsterCard
            key={monster.id}
            onClick={() => handleMonsterClick(monster)}
            selected={monster.id === selectedMonsterId}
            data-testid={monster.id}>
            <Image src={monster.imageUrl} />
            <MonsterName>{monster.name}</MonsterName>
          </MonsterCard>
        ))}
      </MonstersSection>
    </div>
  );
};

export { MonstersList };

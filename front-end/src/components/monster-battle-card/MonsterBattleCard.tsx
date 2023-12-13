import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  NoMonsterTitle,
  ProgressBar,
  Image,
  AttributeTitle,
  MonsterTitle,
} from './MonsterBattleCard.styled';
import { Divider, Stack } from '@mui/material';

type MonsterCardProps = {
  monster?: Monster | null;
  defaultTitle?: string;
};

const MonsterAttribute: React.FC<{
  value: number;
  title: string;
  testId?: string;
}> = ({ value, title, testId }) => {
  return (
    <div data-testid={testId}>
      <AttributeTitle>{title}</AttributeTitle>
      <ProgressBar value={value} variant="determinate" />
    </div>
  );
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({
  defaultTitle,
  monster,
}) => {
  return monster != null ? (
    <BattleMonsterCard centralized={false}>
      <Stack direction="column" spacing={1}>
        <Image src={monster.imageUrl} alt="monster"></Image>
        <MonsterTitle>{monster.name}</MonsterTitle>
        <Divider variant="middle" />
        <MonsterAttribute value={monster.hp} title="HP" testId="hp-testId" />
        <MonsterAttribute value={monster.attack} title="Attack" />
        <MonsterAttribute value={monster.defense} title="Defense" />
        <MonsterAttribute value={monster.speed} title="Speed" />
      </Stack>
    </BattleMonsterCard>
  ) : (
    <BattleMonsterCard centralized>
      <NoMonsterTitle>{defaultTitle}</NoMonsterTitle>
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };

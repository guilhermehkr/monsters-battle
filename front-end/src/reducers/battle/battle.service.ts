import { API_URL } from '../../constants/env';
import { Battle } from '../../models/interfaces/monster.interface';

const battle = async ({
  firstMonsterId,
  secondMonsterId,
}: {
  firstMonsterId?: string;
  secondMonsterId?: string;
}): Promise<Battle> => {
  console.log('service', { firstMonsterId, secondMonsterId });
  return await fetch(`${API_URL}/battle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstMonsterId, secondMonsterId }),
  }).then((response) => response.json());
};

export const BattleService = {
  battle,
};

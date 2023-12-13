import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';
import { getWinner } from './utils';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

interface PostBattleBody {
  firstMonsterId: number;
  secondMonsterId: number;
}

const battle = async (
  req: Request<unknown, unknown, PostBattleBody>,
  res: Response
): Promise<Response> => {
  const { firstMonsterId, secondMonsterId } = req.body;

  if (firstMonsterId == null || secondMonsterId == null) {
    return res.status(StatusCodes.BAD_REQUEST).send('monster id is required');
  }

  const [firstMonster, secondMonster] = await Monster.query().findByIds([
    firstMonsterId,
    secondMonsterId,
  ]);

  if (firstMonster == null || secondMonster == null) {
    return res.status(StatusCodes.NOT_FOUND).send('monster not found');
  }

  const winner = getWinner(firstMonster, secondMonster);
  const battle = await Battle.query()
    .insert({
      firstMonsterId,
      secondMonsterId,
      winnerId: winner.id,
    })
    .withGraphFetched('winner');

  return res.status(StatusCodes.OK).json(battle);
};

export const BattleController = {
  list,
  battle,
};

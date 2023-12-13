import { Monster } from '../../models';

export const getWinner = (monster: Monster, otherMonster: Monster): Monster => {
  const initialAttacker = getInitialAttacker(monster, otherMonster);
  const initialDefender = monster === initialAttacker ? otherMonster : monster;

  const winner = battle(initialAttacker, initialDefender);
  return winner;
};

const getInitialAttacker = (
  monster: Monster,
  otherMonster: Monster
): Monster => {
  let attacker;
  if (monster.speed === otherMonster.speed) {
    attacker = monster.attack > otherMonster.attack ? monster : otherMonster;
  } else {
    attacker = monster.speed > otherMonster.speed ? monster : otherMonster;
  }
  return attacker;
};

const battle = (attacker: Monster, defender: Monster): Monster => {
  if (attacker.hp <= 0) {
    return defender;
  }

  if (defender.hp <= 0) {
    return attacker;
  }

  const damage = getDamage(attacker, defender);
  defender.hp = defender.hp - damage;

  return battle(defender, attacker);
};

const getDamage = (monster: Monster, otherMonster: Monster) => {
  let damage = 1;
  if (monster.attack > otherMonster.defense) {
    damage = monster.attack - otherMonster.defense;
  }
  return damage;
};

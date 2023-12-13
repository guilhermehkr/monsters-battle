import { Battle, Monster } from '..';

describe('Battle Model', () => {
  test('should map properties correctly', async () => {
    const firstMonster = await Monster.query().insert({
      name: 'Monster A',
      attack: 10,
      defense: 10,
      speed: 10,
      hp: 10,
      imageUrl: 'url',
    });

    const secondMonster = await Monster.query().insert({
      name: 'Monster B',
      attack: 10,
      defense: 10,
      speed: 10,
      hp: 10,
      imageUrl: 'url',
    });

    const battle = await Battle.query()
      .insertAndFetch({
        firstMonsterId: firstMonster.id,
        secondMonsterId: secondMonster.id,
        winnerId: secondMonster.id,
      })
      .withGraphFetched('[firstMonster, secondMonster, winner]')
      .debug();
    console.log('#####', battle);
    expect(battle.id).toBeDefined();
    expect(battle.firstMonsterId).toBe(firstMonster.id);
    expect(battle.secondMonsterId).toBe(secondMonster.id);
    expect(battle.secondMonsterId).toBe(secondMonster.id);
    expect(battle.firstMonster).toEqual(expect.objectContaining(firstMonster));
    expect(battle.secondMonster).toEqual(
      expect.objectContaining(secondMonster)
    );
    expect(battle.winner).toEqual(expect.objectContaining(secondMonster));
  });

  test('should have relation mapping', () => {
    expect(Battle.relationMappings).toHaveProperty('firstMonster');
    expect(Battle.relationMappings).toHaveProperty('secondMonster');
    expect(Battle.relationMappings).toHaveProperty('winner');
  });
});

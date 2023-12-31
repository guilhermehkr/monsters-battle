import { Battle, Monster } from '..';

describe('MonsterModel', () => {
  test('should map the properties correctly', async () => {
    const monster = await Monster.query().insert({
      name: 'Random Monster',
      attack: 10,
      defense: 10,
      speed: 10,
      hp: 10,
      imageUrl: 'url',
    });

    await Battle.query().insert({
      firstMonsterId: monster.id,
      secondMonsterId: monster.id,
      winnerId: monster.id,
    });

    console.log(
      'monster',
      await Monster.query().findById(monster.id).withGraphFetched('battles')
    );

    expect(monster.name).toBe('Random Monster');
    expect(monster.attack).toBe(10);
    expect(monster.defense).toBe(10);
    expect(monster.speed).toBe(10);
    expect(monster.hp).toBe(10);
  });

  test('should have relation mapping', () => {
    expect(Monster.relationMappings).toHaveProperty('battles');
  });
});

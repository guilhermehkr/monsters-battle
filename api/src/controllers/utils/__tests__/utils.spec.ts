import { getWinner } from '..';
import { Monster } from '../../../models';

describe('gteWinner()', () => {
  it('should return first monster as winner', () => {
    const monster = {
      id: 1,
      name: 'monster',
      attack: 10,
      defense: 11,
      hp: 50,
      speed: 20,
    } as unknown as Monster;

    const otherMonster = {
      id: 2,
      name: 'other monster',
      attack: 10,
      defense: 11,
      hp: 50,
      speed: 19,
    } as unknown as Monster;

    const winner = getWinner(monster, otherMonster);
    expect(winner.id).toBe(monster.id);
  });

  it('should return second monster as winner', () => {
    const monster = {
      id: 1,
      name: 'monster',
      attack: 10,
      defense: 11,
      hp: 50,
      speed: 20,
    } as unknown as Monster;

    const otherMonster = {
      id: 2,
      name: 'other monster',
      attack: 10,
      defense: 11,
      hp: 50,
      speed: 21,
    } as unknown as Monster;

    const winner = getWinner(monster, otherMonster);
    expect(winner.id).toBe(otherMonster.id);
  });

  it('when Dead Unicorn battes Old snake, Old snack wins', () => {
    const monster = {
      id: 1,
      name: 'Dead Unicorn',
      attack: 60,
      defense: 40,
      hp: 10,
      speed: 80,
    } as unknown as Monster;

    const otherMonster = {
      id: 2,
      name: 'Old Shark',
      attack: 50,
      defense: 20,
      hp: 80,
      speed: 90,
    } as unknown as Monster;

    const winner = getWinner(monster, otherMonster);
    expect(winner.id).toBe(otherMonster.id);
  });

  it('when Dead Uniorn battes Angry Snake, Angry Snake wins', () => {
    const deadUnicorn = {
      id: 1,
      name: 'Dead Unicorn',
      attack: 60,
      defense: 40,
      hp: 10,
      speed: 80,
    } as unknown as Monster;

    const angrySnake = {
      id: 5,
      name: 'Angry Snake',
      attack: 80,
      defense: 20,
      hp: 70,
      speed: 80,
    } as unknown as Monster;

    const winner = getWinner(deadUnicorn, angrySnake);
    expect(winner.id).toBe(angrySnake.id);
  });

  it('when Red Dragon battes Angry Snake, Red Dragon wins', () => {
    const readDragon = {
      id: 3,
      name: 'Red Dragon',
      attack: 90,
      defense: 80,
      hp: 90,
      speed: 70,
    } as unknown as Monster;

    const angrySnake = {
      id: 5,
      name: 'Angry Snake',
      attack: 80,
      defense: 20,
      hp: 70,
      speed: 80,
    } as unknown as Monster;

    const winner = getWinner(readDragon, angrySnake);
    expect(winner.id).toBe(readDragon.id);
  });

  it('when Red Dragon battes Angry Snake, Red Dragon wins', () => {
    const readDragon = {
      id: 4,
      name: 'Robot Bear',
      attack: 50,
      defense: 40,
      hp: 80,
      speed: 60,
    } as unknown as Monster;

    const angrySnake = {
      id: 5,
      name: 'Angry Snake',
      attack: 80,
      defense: 20,
      hp: 70,
      speed: 80,
    } as unknown as Monster;

    const winner = getWinner(readDragon, angrySnake);
    expect(winner.id).toBe(angrySnake.id);
  });
});

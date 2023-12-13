import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { Monster } from '../../models';
import { Id } from 'objection';

const server = app.listen();

beforeAll(() => jest.useFakeTimers());
afterAll(() => server.close());

describe('BattleController', () => {
  describe('List', () => {
    test('should list all battles', async () => {
      const response = await request(server).get('/battle');
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Battle', () => {
    const createMonsters = async (): Promise<Id[]> => {
      const monsters = [
        {
          name: 'First monster',
          attack: 10,
          defense: 11,
          hp: 50,
          speed: 20,
          image_url: '',
        },
        {
          name: 'Second monster',
          attack: 10,
          defense: 11,
          hp: 50,
          speed: 19,
          image_url: '',
        },
      ];

      return await Promise.all(
        monsters.map(async (data) => (await Monster.query().insert(data)).id)
      );
    };

    test.each([
      { firstMonsterId: undefined, secondMonsterId: 10 },
      { firstMonsterId: 10, secondMonsterId: undefined },
    ])(
      'should fail when trying a battle of monsters with an undefined monster',
      async ({ firstMonsterId, secondMonsterId }) => {
        const response = await request(server).post('/battle').send({
          firstMonsterId,
          secondMonsterId,
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      }
    );

    test('should fail when trying a battle of monsters with first monster inexistent', async () => {
      const [, secondMonsterId] = await createMonsters();
      const response = await request(server).post('/battle').send({
        firstMonsterId: Number.MAX_SAFE_INTEGER,
        secondMonsterId,
      });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    test('should fail when trying a battle of monsters with second monster inexistent', async () => {
      const [firstMonsterId] = await createMonsters();
      const response = await request(server).post('/battle').send({
        firstMonsterId: firstMonsterId,
        secondMonsterId: Number.MAX_SAFE_INTEGER,
      });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    test('should insert a battle of monsters successfully with monster 1 winning', async () => {
      // @TODO
    });

    test('should insert a battle of monsters successfully with monster 2 winning', async () => {
      // @TODO
    });
  });
});

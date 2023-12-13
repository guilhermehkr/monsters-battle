import { Knex } from 'knex';
import { Battle } from '../../src/models';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(Battle.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.integer('winner_id');
    table.integer('first_monster_id');
    table.integer('second_monster_id');
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Battle.tableName);

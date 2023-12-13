import { Id, RelationMappings } from 'objection';
import Base from './base';
import { Monster } from './monster.model';

export class Battle extends Base {
  id!: Id;
  firstMonsterId!: Id;
  secondMonsterId!: Id;
  winnerId!: Id;

  readonly firstMonster?: Monster;
  readonly secondMonster?: Monster;
  readonly winner?: Monster;

  static tableName = 'battle';

  static get relationMappings(): RelationMappings {
    return {
      firstMonster: {
        relation: Base.BelongsToOneRelation,
        modelClass: Monster,
        join: {
          from: `${this.tableName}.firstMonsterId`,
          to: `${Monster.tableName}.id`,
        },
      },
      secondMonster: {
        relation: Base.BelongsToOneRelation,
        modelClass: Monster,
        join: {
          from: `${this.tableName}.secondMonsterId`,
          to: `${Monster.tableName}.id`,
        },
      },
      winner: {
        relation: Base.BelongsToOneRelation,
        modelClass: Monster,
        join: {
          from: `${this.tableName}.winnerId`,
          to: `${Monster.tableName}.id`,
        },
      },
    };
  }
}

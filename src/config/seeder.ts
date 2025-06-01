import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './database/db';
import type { QueryInterface } from 'sequelize';
import * as path from 'path';

const queryInterface = sequelize.getQueryInterface();

const seeder = new Umzug<QueryInterface>({
  migrations: {
    glob: 'src/config/seeders/*.ts',
  },
  context: queryInterface,
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
  create: {
    folder: path.join(__dirname, 'seeders'),
  },
});

export { seeder };

if (require.main === module) {
  void seeder.runAsCLI();
}

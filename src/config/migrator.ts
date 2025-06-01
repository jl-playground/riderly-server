import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './database/db';
import type { QueryInterface } from 'sequelize';
import * as path from 'path';

const queryInterface = sequelize.getQueryInterface();

const migrator = new Umzug<QueryInterface>({
  migrations: {
    glob: 'src/config/migrations/*.ts',
  },
  context: queryInterface,
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
  create: {
    folder: path.join(__dirname, 'migrations'),
  },
});

export { migrator };

if (require.main === module) {
  void migrator.runAsCLI();
}

import app from './app';
import dotenv from 'dotenv';
dotenv.config();
import { initSequelize, sequelize } from './config/database/db';
import { migrator } from './config/migrator';
import { seeder } from './config/seeder';

const PORT = process.env.PORT || 3000;

initSequelize()
  .then(async () => {
    await sequelize.authenticate();
    // 💣 Drop database if in local environment
    if (process.env.NODE_ENV === 'local') {
      await sequelize.dropAllSchemas({ logging: false });
    }

    await migrator.up();
    console.log('✅ Database migrated successfully');
    await seeder.up();
    console.log('✅ Database seeded successfully');
  })
  .catch((error) => {
    console.error('❌ Failed to initialize database:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import { initSequelize, sequelize } from "./config/database/db";
import { migrator } from "./config/database/migrator";

const PORT = process.env.PORT || 3000;

initSequelize()
  .then(async () => {
    console.log("✅ Database initialized successfully");
    await sequelize.authenticate();
    console.log("✅ Database connection established");
    await migrator.up();
    console.log("✅ Tables synced");
  })
  .catch((error) => {
    console.error("❌ Failed to initialize database:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

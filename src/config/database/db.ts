import { Sequelize } from "sequelize-typescript";
import { readdirSync, existsSync } from "fs";
import { join } from "path";
import type { ModelCtor, Model } from "sequelize-typescript";
import models from "./models";

console.log(process.env.DB_NAME);

const sequelize: Sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME || "postgres",
  username: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  models: [],
});

export async function initSequelize(): Promise<void> {
  const featuresPath = join(__dirname, "../../features");

  const modelImports = readdirSync(featuresPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map(async (dirent) => {
      const modelPath = join(featuresPath, dirent.name, `${dirent.name}.model`);

      if (!existsSync(modelPath + ".ts") && !existsSync(modelPath + ".js")) {
        return []; // No model in this feature → skip
      }

      try {
        const mod = (await import(modelPath)) as Record<string, unknown>;

        const validModels = Object.entries(mod).filter(([, val]) => typeof val === "function") as [
          string,
          ModelCtor<Model>,
        ][];

        for (const [key, model] of validModels) {
          models[key] = model;
        }

        return validModels.map(([, model]) => model);
      } catch (error) {
        console.error(
          `❌ Failed to load model from ${modelPath}:`,
          error instanceof Error ? error.message : String(error),
        );
        return [];
      }
    });

  const modelGroups = await Promise.all(modelImports);
  const modelFiles = modelGroups.flat();

  sequelize.addModels(modelFiles);
}

export { sequelize };

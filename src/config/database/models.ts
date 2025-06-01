import { readdirSync } from "fs";
import { join } from "path";
import type { ModelCtor, Model } from "sequelize-typescript";

const featuresPath = join(__dirname, "../../features");

const models: Record<string, ModelCtor<Model>> = {};

export async function loadModels(): Promise<typeof models> {
  const modelImports = readdirSync(featuresPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map(async (dirent) => {
      //TODO: add production env
      console.log(`Loading models from directory: ${dirent.name}`);
      console.log(featuresPath, dirent.name, `${dirent.name}.model`);
      const modelPath = join(featuresPath, dirent.name, `${dirent.name}.model`);
      console.log("swkjglksdhgklsdhgklsdhglkshdgkl", modelPath);

      try {
        const mod = (await import(modelPath)) as Record<string, unknown>;
        for (const [key, val] of Object.entries(mod)) {
          if (typeof val === "function") {
            models[key] = val as ModelCtor<Model>;
          }
        }
      } catch (err) {
        console.error(`❌ Failed to load model from ${modelPath}:`, (err as Error).message);
      }
    });

  await Promise.all(modelImports);
  return models;
}

export default models;

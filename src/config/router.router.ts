import express from "express";
import type { Router as ExpressRouter, RequestHandler } from "express";
import fs from "fs";
import path from "path";

class Router {
  private readonly router: ExpressRouter;

  constructor() {
    this.router = express.Router();
    void this.initializeRoutes();
  }

  private async initializeRoutes(): Promise<void> {
    const routesPath = path.join(__dirname, "../features");
    const features = fs.readdirSync(routesPath);

    for (let i = 0; i < features.length; i++) {
      const feature = features[i];
      const routeFile = path.join(routesPath, feature, `${feature}.routes.ts`);

      if (fs.existsSync(routeFile)) {
        const featureRouterModule: unknown = await import(routeFile);
        console.log(featureRouterModule);
        if (
          featureRouterModule &&
          typeof featureRouterModule === "object" &&
          "default" in featureRouterModule
        ) {
          const featureRouter = (
            featureRouterModule as { default: ExpressRouter }
          ).default;

          this.router.use(`/${feature}`, featureRouter);
        }
      }
    }
  }

  public getRouter(): ExpressRouter {
    return this.router;
  }
}
export default Router;

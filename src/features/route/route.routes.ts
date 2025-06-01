import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Route route");
});

export default router;

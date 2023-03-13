import express from "express";
const router = express.Router();
import ballotController from "../apps/controllers/ballot.controller";

router.post("/", ballotController.getAllBallots);

export default router;

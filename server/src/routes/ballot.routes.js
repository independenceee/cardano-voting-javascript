import express from "express";
const router = express.Router();
import ballotController from "../apps/controllers/ballot.controller";
import upload from "../configs/upload.config";

router.get("/", ballotController.getAllBallots);
router.get("/:id", ballotController.getBallotById);
router.post("/", upload, ballotController.createBallot);
router.patch("/:id", upload, ballotController.updateBallot);
router.delete("/:id", ballotController.deleteBallotById);

export default router;

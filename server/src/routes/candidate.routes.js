import express from "express";
import candidateController from "../apps/controllers/candidate.controller";
import upload from "../configs/upload.config";
const router = express.Router();

router.get("/", candidateController.getAllCandidates);
router.get("/:id", candidateController.getCandidateById);
router.post("/", upload, candidateController.createCandidate);
router.patch("/:id", upload, candidateController.updateCandidate);
router.delete("/:id", candidateController.deleteCandidateById);

export default router;

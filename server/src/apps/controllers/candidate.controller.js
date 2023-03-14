import dotenv from "dotenv";
import prisma from "../models/index.model";

class CandidateController {
    constructor() {
        dotenv.config();
    }

    async getAllCandidates(request, response) {
        try {
            const { ballotId } = request.query;
            const candidates = await prisma.candidate.findMany({
                where: {
                    ballotId: ballotId,
                },
            });
            response.status(200).json(candidates);
        } catch (error) {
            response.status(404).json({
                message: error,
            });
        }
    }

    async getCandidateById(request, response) {
        try {
            const { candidateId } = request.params;
            const { ballotId } = request.query;

            const candidate = await prisma.candidate.findFirst({
                where: {
                    id: candidateId,
                    ballotId: ballotId,
                },
            });
            if (!candidate) {
                response.status(404).json({
                    message: "Candidate not found",
                });
            }

            response.status(200).json(candidate);
        } catch (error) {
            response.status(404).json({
                message: error,
            });
        }
    }

    async createCandidate(request, response) {
        try {
            const { ballotId } = request.query;
            const { name, description } = request.body;
            const { filename } = request.file;

            const candidate = await prisma.candidate.create({
                data: {
                    name: name,
                    description: description,
                    ballotId: ballotId,
                    image: `http://localhost:${process.env.PORT}${request.file.filename}`,
                },
            });

            response.status(200).json({
                message: "Candidate has been created",
            });
        } catch (error) {
            response.status(404).json({
                message: error,
            });
        }
    }

    async updateCandidate(request, response) {
        try {
            const { id } = request.params;
            const { name, description } = request.body;
            const { filename } = request.file;
            const { ballotId } = request.query;

            const ballot = await prisma.candidate.updateMany({
                where: {
                    id: id,
                    ballotId: ballotId,
                },
                data: {
                    name: name,
                    description: description,
                    image: `http://localhost:${process.env.PORT}${request.file.filename}`,
                },
            });

            response.status(200).json({
                message: "Candidate updated successfully",
            });
        } catch (error) {
            response.status(404).json({
                message: error,
            });
        }
    }

    async deleteCandidateById(request, response) {
        try {
            const { ballotId } = request.query;
            const { id } = request.params;

            await prisma.candidate.delete({
                where: {
                    id: id,
                    ballotId: ballotId,
                },
            });
        } catch (error) {
            response.status(404).json({
                message: error,
            });
        }
    }
}

export default new CandidateController();

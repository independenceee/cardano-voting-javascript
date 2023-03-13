import path from "path";
import dotenv from "dotenv";
import multer from "multer";
import prisma from "../models/index.model";
import upload from "../../configs/upload.config";

class BallotController {
    constructor() {
        dotenv.config();
    }
    async getAllBallots(request, response) {
        try {
            const ballots = await prisma.ballot.findMany();
            response.status(200).json(ballots);
        } catch (error) {
            response.status(404).json({
                message: error,
            });
        }
    }

    async getBallotById(request, response) {
        try {
            const { ballotId } = request.params;
            const ballot = await prisma.ballot.findFirst({
                where: {
                    id: ballotId,
                },
            });

            if (!ballot) {
                response.status(404).json({
                    message: "Ballot not found",
                });
            }
            response.status(200).json(ballot);
        } catch (error) {
            response.status(200).json({
                message: error,
            });
        }
    }

    async createBallot(request, response) {
        try {
            const { name, description, addressWallet } = request.body;
            console.log(request.file);
            const { image } = request.file;


            const ballot = await prisma.ballot.create({
                data: {
                    name: name,
                    description: description,
                    addressWallet: addressWallet,
                    image: `http://localhost:8000/${request.file.filename}`,
                },
            });

            console.log(ballot);
        } catch (error) {
            response.status(200).json({
                message: error,
            });
        }
    }

    async updateBallot(request, response) {
        try {
            const { id } = request.params;
            const { name, description, addressWallet } = request.body;
            const path = uploadConfig.uploadSingleFile();

            const ballot = await prisma.ballot.updateMany({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                    description: description,
                    image: `http://localhost:${process.env.PORT}${path}`,
                },
            });
        } catch (error) {
            response.status(404).json({
                message: error,
            });
        }
    }
    async deleteBallotById(request, response) {
        try {
            const { ballotId } = request.params;
            await prisma.ballot.delete({
                where: {
                    id: ballotId,
                },
            });

            response.status(200).json({
                message: "Ballot deleted successfully",
            });
        } catch (error) {
            response.status(404).json({
                message: error,
            });
        }
    }
}

export default new BallotController();


import prisma from "../models/index.model";

class BallotController extends PrismaClient {
    async getAllBallots(request, response) {
        try {
            const ballots = await prisma.ballot.findMany();
            response.status(200).json(ballot);
        } catch (error) {
            response.status(404).json({
                message: error,
            });
        }
    }

    async getBallotById(request, response) {
        try {
            const { ballotId } = request.params;
            const ballot = await prisma.ballot.findFirst({});
        } catch (error) {
            response.status(200).json({
                message: error,
            });
        }
    }
}

export default new BallotController();

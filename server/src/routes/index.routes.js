import ballotRouter from "./ballot.routes";
import candidateRouter from "./candidate.routes";

const router = function (app) {
    app.use("/api/v1/ballots", ballotRouter);
    app.use("/api/v1/candidates", candidateRouter);
};

export default router;

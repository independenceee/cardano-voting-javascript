import ballotRouter from "./ballot.routes";

const router = function (app) {
    app.use("/api/v1/ballots", ballotRouter);
};

export default router;

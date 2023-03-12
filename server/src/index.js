import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/index.routes";

const app = express();
app.use(cors());
app.use(express.json());

router(app);
dotenv.config();
const PORT = process.env.PORT || 8000;
const start = async function () {
    try {
        await app.listen(PORT, function () {
            console.log(`http://localhost${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

(function () {
    start();
})();

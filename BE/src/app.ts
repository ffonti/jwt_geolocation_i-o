import * as dotenv from "dotenv";
import express from "express";
import cors, { CorsOptions as corsOptions } from "cors";

dotenv.config();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use("/api/v1/login", require("./routes/login.routes"));
app.use("/api/v1/register", require("./routes/register.routes"));
app.use("/api/v1/homePage", require("./routes/homePage.routes"));

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});

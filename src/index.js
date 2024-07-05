import express from "express";
import connectDatabase from "./database/db.js";
import routes from "./routes.js";
import cors from "cors";

import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/", routes);

connectDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server rodando e DB conectado! 🚀");
    });
  })
  .catch((err) => console.log(err));

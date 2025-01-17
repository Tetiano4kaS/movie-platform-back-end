import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import cors from "cors";

import { ApiError } from "./errors/ApiError";
import movieRoutes from "./routes/movieRoutes";

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/movies", movieRoutes);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err?.status || 500;
  return res.status(status).json({ message: err.message, status });
});

const PORT = 4000;
app.listen(PORT, () => {
  mongoose.connect("mongodb://127.0.0.1:27017")
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.error("Failed to connect to MongoDB", err));
  console.log(`Server was started on Port ${PORT}`);
});

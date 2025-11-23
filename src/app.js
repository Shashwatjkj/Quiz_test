import "../database/migrate.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db/connection.js";
import timer from "./utils/func.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(cors(
  
));

import homeRouter from "./routers/home.js";
import studentRoutes from "./routers/student.routes.js";
import quizRoutes from "./routers/quiz.routes.js";

app.use("/", homeRouter);

app.use("/api-student", studentRoutes);

app.use("/api-quiz",quizRoutes)







connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })})
.catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
})


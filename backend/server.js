import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import chatRoutes from "./routes/chat.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
    connectDB();
});
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}

// // Gemini client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Example route
// app.post("/ask", async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     console.log("Prompt received:", prompt);

//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const result = await model.generateContent(prompt);

//     console.log("Gemini raw response:", result);

//     res.send(result.response.text())
//   } catch (error) {
//     console.error("FULL ERROR:", error);  // 👈 see what went wrong
//     res.status(500).json({ error: error.message });
//   }
// });
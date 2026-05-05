import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getOpenAIAPIResponse = async (message) => {
  try {
    console.log("Prompt received:", message);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);

    console.log("Gemini raw response:", result);
    return result.response.text();
  } catch (error) {
    console.error("FULL ERROR:", error);
    return "Error generating response.";
  }
};

export default getOpenAIAPIResponse;
"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { info, careers } from "./info";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export default async function GetResponse(message) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
  const result = await model.generateContent({
    systemInstruction: { parts: [{ text: info }, { text: careers }] },
    contents: [{ role: "user", parts: [{ text: message }] }],
  });
  return result.response.text();
}
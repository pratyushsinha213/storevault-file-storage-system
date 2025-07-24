import { GoogleGenerativeAI } from "@google/generative-ai";
// import readline from 'readline';
// import { GoogleGenAI } from "@google/genai";

import { GEMINI_AI_API_KEY } from "../config/env.js";

const geminiAi = new GoogleGenerativeAI(GEMINI_AI_API_KEY);

export default geminiAi;

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// async function run() {
//     const model = await genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const chat = model.startChat({
//         history: [],
//         generationConfig: {
//             maxOutputTokens: 200
//         }
//     });

//     async function askAndResponse() {
//         rl.question("You: ", async (msg) => {
//             if (msg.toLowerCase() === 'exit') {
//                 rl.close();
//             } else {
//                 const result = await chat.sendMessage(msg);
//                 const response = await result.response;
//                 const text = await response.text();
//                 console.log(`AI: ${text}`);
//                 askAndResponse();
//             }
//         });
//     }

//     askAndResponse();
// }

// run();
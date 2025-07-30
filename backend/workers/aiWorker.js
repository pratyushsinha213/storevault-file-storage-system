// import { Worker } from 'bullmq';
// import redis from '../services/redisClient.js';
// // import { aiSummarizeAndClassify } from '../services/aiService.js'; // To be implemented
// import File from '../models/File.js';
// // import s3Service from '../services/s3Service.js'; // To be used for S3 download

// const connection = redis.options;

// const worker = new Worker('ai-tasks', async job => {
//   const { fileId, s3Key, mimeType, originalname } = job.data;
//   try {
//     // 1. Download the file from S3
//     // const fileBuffer = await s3Service.downloadFromS3(s3Key);
//     // Placeholder: fileBuffer = null;
//     // 2. Extract text from the file (use pdf-parse, mammoth, textract, etc.)
//     // const extractedText = await extractText(fileBuffer, mimeType);
//     // Placeholder: extractedText = 'Sample extracted text';
//     // 3. Call the LLM (OpenAI/Gemini) to summarize/classify
//     // const { summary, tags } = await aiSummarizeAndClassify(extractedText);
//     // Placeholder:
//     const summary = `Summary for file: ${originalname}`;
//     const tags = ['sample', 'ai', 'demo'];
//     // 4. Update the file document in MongoDB
//     await File.findByIdAndUpdate(fileId, { summary, tags });
//     // --- End of AI processing ---
//   } catch (err) {
//     console.error('AI worker job failed:', err);
//     throw err;
//   }
// }, { connection });

// worker.on('completed', job => {
//   console.log(`AI Job ${job.id} completed`);
// });

// worker.on('failed', (job, err) => {
//   console.error(`AI Job ${job.id} failed:`, err);
// }); 
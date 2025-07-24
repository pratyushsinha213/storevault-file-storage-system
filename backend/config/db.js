import mongoose from "mongoose";
import { MONGO_URI } from './env.js';

const connectToDatabase = async () => {
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in the environment variables.");
    }

    try {
        const connection = await mongoose.connect(MONGO_URI);
        console.log(`Connected to MongoDB : ${connection.connection.host}/${connection.connection.name}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export default connectToDatabase;
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export function connect_db() {
    if (process.env.DB_URL) {
        mongoose.connect(process.env.DB_URL)
            .then(_ => console.log(`connected to local DB`))
            .catch(e => console.log(`failed to connect to DB`, e));
    }
}

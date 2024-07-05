import mongoose from "mongoose";
import 'dotenv/config'

async function connectDatabase() {
  await mongoose.connect(process.env.MONGODB_CONNECT_URI);
}

export default connectDatabase;

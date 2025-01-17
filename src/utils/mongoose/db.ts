import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const connectDB = async () => {
  try {
    const dbName = process.env.DB_NAME;
    const MONGODB_URI = process.env.MONGODB_URI;

    await mongoose.connect(MONGODB_URI!, { dbName });
    // console.log('master_category: ', master_category);
    console.log('db connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`MongoDB Error: ${err.message}`);
    } else {
      console.error('Unknown error occurred');
    }
    process.exit(1);
  }
};

export default connectDB;

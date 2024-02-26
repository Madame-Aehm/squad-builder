import mongoose from "mongoose";

const connectMongoose = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB : ${connection.connection.host}`);
  } catch (error) {
    console.log("error ", error);
    throw new Error("Cannot connect to MongoDB");
  }
};

export default connectMongoose;
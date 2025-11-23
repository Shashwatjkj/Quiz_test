import mongooese from 'mongoose';
import timer from "../utils/func.js"

 const connectDB = async () => {
  try {
    const databaseConnection =await mongooese.connect(process.env.MONGO_URI)
    console.log(`Database connected: ${databaseConnection.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  } 
}
export default connectDB;

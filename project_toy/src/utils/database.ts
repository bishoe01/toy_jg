import { MongoClient, Db } from 'mongodb';
import { env } from 'process';

const uri = env.MONGODB_URI as string; 
const options = { useNewUrlParser: true, useUnifiedTopology: true };
let cachedDb: Db | null = null; 

async function connectDB(): Promise<Db> {
  if (cachedDb) {
    return cachedDb; 
  }

  try {
    const client = await MongoClient.connect(uri, options);
    const db = client.db('nextjs'); // 데이터베이스 이름을 'product'로 지정
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; 
  }
}

export default connectDB;

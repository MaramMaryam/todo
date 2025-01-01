// import {MongoClient} from 'mongodb'

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>

// const uri = process.env.MONGODB_URI;

// const options: any = {
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }

// if(!process.env.MONGODB_URI){
//     throw new Error('Please add your MongoDB atlas connection string to .env.local')
// }

// client = new MongoClient(uri!, options);
// clientPromise = client.connect();

// clientPromise.then(()=> console.log('Connected to MongoDB Atlas'))

// export default clientPromise


// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Your MongoDB URI from .env
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the client is not constantly recreated.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

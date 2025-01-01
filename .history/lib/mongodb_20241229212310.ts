import {MongoClient} from 'mongodb'

let client: MongoClient;
let clientPromise: Promise<MongoClient>

const uri = pro
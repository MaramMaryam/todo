import {MongoClient} from 'mongodb'

let client: MongoClient;
let clientPromise: Promise<MongoClient>

const uri = process.env.MONGODB_URI;

const options: any = {
    useNewUrlParser:true
    use
}
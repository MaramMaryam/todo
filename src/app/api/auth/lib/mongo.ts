import {MongoClient, ObjectId, UpdateResult} from 'mongodb';
import {URL} from 'url';


export class oauthTokenInfo {
    access_token: string;
    refresh_token: string;
    expires_at: number;

    constructor(access_token: string, refresh_token: string, expires_at: number) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.expires_at = expires_at;
    }
}

export async function getToken(userId: string): Promise<oauthTokenInfo | null> {

    const url = new URL(process.env.MONGODB_URI!);
    const baseUri = `${url.protocol}//${url.username}:${url.password}@${url.host}/`;

    let client = new MongoClient(baseUri!);

    try {
        // Connect to MongoDB
        await client.connect();

        // Select the 'tokens' collection
        const db = client.db(process.env.MONGODB_DATABASE);
        const tokensCollection = db.collection('accounts');

        // Query for the token of a specific user
        const token = await tokensCollection.findOne({userId: new ObjectId(userId)});

        // Return the access token
        return new oauthTokenInfo(token?.access_token, token?.refresh_token, token?.expires_at);
    } catch (error) {
        console.error('Error fetching access token:', error);
        return null;
    } finally {
        // Close the database connection
        await client.close();
    }
}


export async function saveUserNewTokenData(userId: string, newTokenData: oauthTokenInfo): Promise<boolean> {
    console.log("requested to store new token data");

    const url = new URL(process.env.MONGODB_URI!);
    const baseUri = `${url.protocol}//${url.username}:${url.password}@${url.host}/`;

    let client = new MongoClient(baseUri!);

    try {
        // Connect to MongoDB
        await client.connect();

        // Select the 'tokens' collection
        const db = client.db(process.env.MONGODB_DATABASE);
        const tokensCollection = db.collection('accounts');

        // we need to have the current time to store data
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        console.log(currentTimestampInSeconds);

        // save to database
        const token: UpdateResult<Document> = await tokensCollection.updateOne(
            {userId: new ObjectId(userId)},
            {
                $set: {
                    access_token: newTokenData.access_token,
                    refresh_token: newTokenData.refresh_token,
                    expires_at: newTokenData.expires_at + currentTimestampInSeconds,
                }
            }
        );

        // Close the database connection
        await client.close();

        // check if any data is modified
        return token.modifiedCount > 0;

    } catch (error) {
        console.error('Error fetching access token:', error);
    }

    // Close the database connection
    await client.close();

    return false;

}



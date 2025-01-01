import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(){
    const client = await clientPromise;
    const collection = client.db().collection('todos')
    try{
        const todos = await collection.find({}).toArray();
        return NextResponse.json(todos, {status: 200})
    }
    catch(error){
        return NextResponse.json(error, {status:500})
    }
}

export async function POST(req:NextRequest) {
    const client = await clientPromise;
    const collection = client.db().collection('todos')

    const {text} = await req.json();
    try{
        const todo = { text:text, completed: false };
    }
}
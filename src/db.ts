import { MongoClient } from 'mongodb';

import {z} from 'zod'

if (!process.env.DB_URL) {
    throw new Error('missing DB url in .env')
}

if (!process.env.DB_NAME) {
    throw new Error('missing DB name in .env')
}

const url = process.env.DB_URL;
const client = new MongoClient(url);


// console.log('url',url)

client.connect();
console.log('successful connection to server');
export default client.db(process.env.DB_NAME)


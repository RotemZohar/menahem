import { MongoClient } from "mongodb";
import {
  menahemDbName,
  userName,
  password,
  hobbiesCollectionName,
} from "../consts";


const uri = `mongodb+srv://${userName}:${password}@menahem.jjn8m.mongodb.net/${menahemDbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

export async function getAllHobbies() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client
      .db(menahemDbName)
      .collection(hobbiesCollectionName)
      .find()
      .toArray();
    return result;
  } catch (e) {
    console.error(e);
    return "";
  } finally {
    await client.close();
  }
}

import { MongoClient } from "mongodb";
import { menahemDbName, hobbiesCollectionName } from "../consts";

export async function getAllHobbies(client: MongoClient) {
  try {
    const result = await client
      .db(menahemDbName)
      .collection(hobbiesCollectionName)
      .find()
      .toArray();
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getHobby(client: MongoClient, _id: string) {
  try {
    const query = { _id: { $eq: _id } };
    // Connect to the MongoDB cluster
    // await client.connect();
    const result = await client
      .db(menahemDbName)
      .collection(hobbiesCollectionName)
      .findOne(query);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

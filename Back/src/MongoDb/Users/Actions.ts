import { MongoClient, ObjectId } from "mongodb";
import { menahemDbName, usersCollectionName } from "../consts";

export async function addUser(client: MongoClient, user: any) {
  try {
    const result = await client
      .db(menahemDbName)
      .collection(usersCollectionName)
      .insertOne(user);
    return result.insertedId;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getUser(client: MongoClient, email: string) {
  try {
    const result = await client
      .db(menahemDbName)
      .collection(usersCollectionName)
      .findOne({ email: { $eq: email } });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateUserDetails(
  client: MongoClient,
  _id: ObjectId,
  name: string,
  password: string
) {
  try {
    let result;
    if (password) {
      result = await client
        .db(menahemDbName)
        .collection(usersCollectionName)
        .updateOne({ _id: { $eq: _id } }, { $set: { name, password } });
    } else {
      result = await client
        .db(menahemDbName)
        .collection(usersCollectionName)
        .updateOne({ _id: { $eq: _id } }, { $set: { name } });
    }
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function validateUser(client: MongoClient, user: any) {
  try {
    const jsonUser = JSON.parse(user);
    const result = await client
      .db(menahemDbName)
      .collection(usersCollectionName)
      .findOne({
        email: { $eq: jsonUser.email },
        password: { $eq: jsonUser.password },
      });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

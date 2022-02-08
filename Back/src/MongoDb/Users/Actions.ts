import { MongoClient, ObjectId } from "mongodb";
import { menahemDbName, usersCollectionName } from "../consts";

export async function addUser(client: MongoClient, user: any) {
  try {
    const result = await client
      .db(menahemDbName)
      .collection(usersCollectionName)
      .insertOne(user);
    console.log(result.insertedId);
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
    return "";
  }
}

export async function editUserPassword(
  client: MongoClient,
  _id: ObjectId,
  new_password: string
) {
  try {
    const result = await client
      .db(menahemDbName)
      .collection(usersCollectionName)
      .updateOne({ _id: { $eq: _id } }, { $set: { password: new_password } });
    return result;
  } catch (e) {
    console.error(e);
    return "";
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
    return "";
  }
}

export const getAllUsers = async () => {
  try {
    await client.connect();
    return await client
      .db(menahemDbName)
      .collection(usersCollectionName)
      .find()
      .toArray();
  } finally {
    await client.close();
  }
};

export const setUserConnected = async (email: string, isConnected = true) => {
  try {
    await client.connect();

    await client
      .db(menahemDbName)
      .collection(usersCollectionName)
      .updateOne({ email }, { $set: { isConnected } });
  } finally {
    await client.close();
  }
};

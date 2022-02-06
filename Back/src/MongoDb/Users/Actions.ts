import { MongoClient, ObjectId } from 'mongodb';
import {
  menahemDbName,
  userName,
  password,
  usersCollectionName,
} from '../consts';

const uri = `mongodb+srv://${userName}:${password}@menahem.jjn8m.mongodb.net/${menahemDbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

export async function addUser(user: any) {
  try {
    // const userRom = {
    //   email: "RomORm@ROmfdf",
    //   password: "fdfdf",
    //   hobby: "gaming",
    // };
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client
      .db(menahemDbName)
      .collection(usersCollectionName)
      .insertOne(user);
    console.log(result.insertedId);
    return result.insertedId;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await client.close();
  }
}

export async function getUser(email: string) {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client
      .db(menahemDbName)
      .collection(usersCollectionName)
      .findOne({ email: { $eq: email } });
    return result;
  } catch (e) {
    console.error(e);
    return '';
  } finally {
    await client.close();
  }
}

export async function editUserPassword(_id: ObjectId, new_password: string) {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client
      .db(menahemDbName)
      .collection(usersCollectionName)
      .updateOne({ _id: { $eq: _id } }, { $set: { password: new_password } });
    return result;
  } catch (e) {
    console.error(e);
    return '';
  } finally {
    await client.close();
  }
}

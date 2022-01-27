import {
  menahemDbName,
  userName,
  password,
  usersCollectionName,
} from "../consts";

const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${userName}:${password}@menahem.jjn8m.mongodb.net/${menahemDbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    console.log(
      `${result.insertedCount} new user(s) created with the following id(s):`
    );
    console.log(result.insertedIds);
    return result.insertedIds;
  } catch (e) {
    console.error(e);
    return "";
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
        .findOne({
          email: { $eq: email },
        })
        .toArray();
      return result;
    } catch (e) {
      console.error(e);
      return "";
    } finally {
      await client.close();
    }
  }

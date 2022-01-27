import {
  menahemDbName,
  userName,
  password,
  postsCollectionName,
} from "../consts";

const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${userName}:${password}@menahem.jjn8m.mongodb.net/${menahemDbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function getAllPosts() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client
      .db(menahemDbName)
      .collection(postsCollectionName)
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

export async function getPostByTag(tag: string) {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client
      .db(menahemDbName)
      .collection(postsCollectionName)
      .find({
        tag: { $eq: tag },
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

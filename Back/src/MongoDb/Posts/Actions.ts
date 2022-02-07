import { MongoClient, ObjectId } from "mongodb";
import { menahemDbName, postsCollectionName } from "../consts";

export async function getAllPosts(client: MongoClient) {
  try {
    const result = await client
      .db(menahemDbName)
      .collection(postsCollectionName)
      .find()
      .toArray();
    return result;
  } catch (e) {
    console.error(e);
    return "";
  }
}

export async function getPostByTag(client: MongoClient, tag: string) {
  try {
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
  }
}

export async function addPost(client: MongoClient, post: any) {
  try {
    const result = await client
      .db(menahemDbName)
      .collection(postsCollectionName)
      .insertOne(post);
    return result;
  } catch (e) {
    console.error(e);
    return "";
  }
}

export async function editPost(client: MongoClient, _id: ObjectId, post: any) {
  try {
    const result = await client
      .db(menahemDbName)
      .collection(postsCollectionName)
      .updateOne(
        { _id: { $eq: _id } },
        {
          $set: {
            title: post.title,
            text: post.text,
            imgUrl: post.imgUrl,
            tag: post.tag,
          },
        }
      );
    return result;
  } catch (e) {
    console.error(e);
    return "";
  }
}

export async function deletePost(client: MongoClient, _id: ObjectId) {
  try {
    const result = await client
      .db(menahemDbName)
      .collection(postsCollectionName)
      .deleteOne({ _id: { $eq: _id } });
    return result;
  } catch (e) {
    console.error(e);
    return "";
  }
}

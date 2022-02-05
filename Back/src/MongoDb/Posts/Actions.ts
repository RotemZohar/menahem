import { MongoClient, ObjectId } from "mongodb";
import {
    menahemDbName,
    userName,
    password,
    postsCollectionName,
} from "../consts";

const uri = `mongodb+srv://${userName}:${password}@menahem.jjn8m.mongodb.net/${menahemDbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

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

export async function addPost(post: any) {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const result = await client
            .db(menahemDbName)
            .collection(postsCollectionName)
            .insertOne(post);
        return result;
    } catch (e) {
        console.error(e);
        return "";
    } finally {
        await client.close();
    }
}

export async function editPost(_id: ObjectId, post: any) {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
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
    } finally {
        await client.close();
    }
}

export async function deletePost(_id: ObjectId) {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const result = await client
            .db(menahemDbName)
            .collection(postsCollectionName)
            .deleteOne({ _id: { $eq: _id } });
        return result;
    } catch (e) {
        console.error(e);
        return "";
    } finally {
        await client.close();
    }
}

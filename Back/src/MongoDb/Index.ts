// const { MongoClient } = require('mongodb');

//     const dbName = 'Menahem';
//     const userName = 'Romk';
//     const password = 'Aa123456';

// export async function runDb(){
    
//     const uri = `mongodb+srv://${ userName }:${ password }@menahem.jjn8m.mongodb.net/${ dbName }?retryWrites=true&w=majority`;
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     try {
        
//         // Connect to the MongoDB cluster
//         await client.connect();
//         return client;
 
//     } catch (e) {
//         return console.error(e);
        
//     } finally {
//         // await client.close();
//     }
// }   



// // mainDb().catch(console.error);


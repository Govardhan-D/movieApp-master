import { Client, Databases, ID, Query } from "react-native-appwrite"

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID);

const db = new Databases(client)

async function updateRecord(query, movie){
    console.log("hi")
    try{
        const result = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('search_term', query)
        ])
        if(result.documents.length>0){
            console.log("Updating Record");

            const existingMovie = result.documents[0];
            await db.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
                count: existingMovie.count + 1
            })
            db.updateDocument();
        }
        else{
            console.log("Creating a document");
            await db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                search_term: query,
                count: 1,
                poster_path: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
                movie_id: movie.id,
                title: movie.title
            })
        }
    }catch(error){
        console.log(error);
        throw error;
    }

}
async function getTrendingMovies(){
    try{
        const result = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])
        return result.documents
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
export {updateRecord, getTrendingMovies};
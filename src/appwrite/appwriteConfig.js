import conf from '../config/config.js'
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl) // API Endpoint
                .setProject(conf.appwriteProjectId) // Project ID

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );

        } catch (error) {
            console.log("Appwrite error :: createPost :: ",error);
            const msg = String(error);
            alert(msg.substring(19));
            return (false);
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );

        } catch (error) {
            console.log("Appwrite error :: updatePost :: ",error);
            const msg = String(error);
            alert(msg.substring(19));
            return (false);
        }
    }

    async deletePost(slug){
        try {
            const document = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            if(document) return (true);
            return (false);
            
        } catch (error) {
            console.log("Appwrite error :: deletePost :: ",error);
            const msg = String(error);
            alert(msg.substring(19));
            return (false);
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            
        } catch (error) {
            console.log("Appwrite error :: getPost :: ",error);
            return (false);
        }
    }

    async getAllPosts(queries = [Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            
        } catch (error) {
            console.log("Appwrite error :: getAllPosts :: ",error);
            return (false);
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            
        } catch (error) {
            console.log("Appwrite error :: uploadFile :: ",error);
            const msg = String(error);
            alert(msg.substring(19));
            return (false);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return (true);
            
        } catch (error) {
            console.log("Appwrite error :: deleteFile :: ",error);
            const msg = String(error);
            alert(msg.substring(19));
            return (false);
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }

};

const databaseService = new DatabaseService();
export default databaseService;
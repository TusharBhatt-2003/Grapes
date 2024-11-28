import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class AppwriteService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
    name,
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        { title, content, featuredImage, status, userId, name },
      );
    } catch (error) {
      console.log("AppwriteService :: createPost :: error", error);
      return null; // Explicitly return null on error
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, name }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        { title, content, featuredImage, status, name },
      );
    } catch (error) {
      console.log("AppwriteService :: updatePost :: error", error);
      return null; // Explicitly return null on error
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
      );
      return true;
    } catch (error) {
      console.log("AppwriteService :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
      );
    } catch (error) {
      console.log("AppwriteService :: getPost :: error", error);
      return null; // Explicitly return null on error
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        queries,
      );
    } catch (error) {
      console.log("AppwriteService :: getPosts :: error", error);
      return null; // Explicitly return null on error
    }
  }

  // File upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketID,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("AppwriteService :: uploadFile :: error", error);
      return null; // Explicitly return null on error
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("AppwriteService :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketID, fileId).href; // Return the preview URL
  }

  async getUserById(userId) {
    try {
      const response = await this.databases.getDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        userId,
      );
      return response;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }

  async createUserProfile(users, profileData) {
    try {
      const response = await this.databases.createDocument(
        config.appwriteDatabaseID, // Replace with your database ID
        "66e65f370026a4889aaa", // Replace with your collection ID
        users, // Unique ID for the document
        profileData,
      );
      return response;
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(users, profileData) {
    try {
      const response = await this.databases.updateDocument(
        config.appwriteDatabaseID, // Replace with your database ID
        "66e65f370026a4889aaa", // Replace with your collection ID
        users, // Document ID
        profileData,
      );
      return response;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  // Get user profile
  async getUserProfile(userId) {
    try {
      const response = await this.databases.getDocument(
        config.appwriteDatabaseID, // Replace with your database ID
        "66e65f370026a4889aaa", // Replace with your collection ID
        userId, // Document ID
      );
      return response;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }
}

export default new AppwriteService();

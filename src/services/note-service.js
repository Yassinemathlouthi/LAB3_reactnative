import { Query, ID, Databases } from "appwrite";
import { listDocuments } from "./database-service";
import client from "./appwrite-config";
import { APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID } from "@env";

const databases = new Databases(client);

// Get all notes, potentially filtered by userId
export const getNotes = async (userId = null) => {
  try {
    // Create query array - initially empty
    const queries = [];

    // If userId is provided, add a filter to only get notes for that user
    if (userId) {
      queries.push(Query.equal("userId", userId));
    }

    // Add sorting by createdAt in descending order (newest first)
    queries.push(Query.orderDesc("createdAt"));

    // Use the listDocuments function from database-service
    const notes = await listDocuments(queries);
    return notes;
  } catch (error) {
    console.error("Error getting notes:", error);
    throw error;
  }
};

// Create a new note
export const createNote = async (data) => {
  try {
    // Add timestamps to the note data
    const noteData = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Create a document in the database
    const response = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      ID.unique(), // Generate a unique ID
      noteData
    );

    return response;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

// Delete a note by ID
export const deleteNote = async (noteId) => {
  try {
    // Delete the document with the specified ID
    await databases.deleteDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      noteId
    );

    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

// Update an existing note
export const updateNote = async (noteId, data) => {
  try {
    // Add updated timestamp
    const noteData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    // Update the document in the database
    const response = await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      noteId,
      noteData
    );

    return response;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};
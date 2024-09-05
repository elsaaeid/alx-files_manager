// utils/db.js
import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        const uri = `mongodb://${host}:${port}/${database}`;

        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.isConnected = false;

        // Connect to MongoDB
        this.client.connect()
            .then(() => {
                console.log('Connected to MongoDB');
                this.isConnected = true;
            })
            .catch(err => {
                console.error('MongoDB Connection Error:', err);
                this.isConnected = false;
            });
    }

    // Check if the MongoDB client is alive
    isAlive() {
        return this.isConnected;
    }

    // Asynchronous function to get the number of users
    async nbUsers() {
        try {
            const db = this.client.db();
            const usersCollection = db.collection('users');
            return await usersCollection.countDocuments();
        } catch (err) {
            console.error('Error counting users:', err);
            return 0;
        }
    }

    // Asynchronous function to get the number of files
    async nbFiles() {
        try {
            const db = this.client.db();
            const filesCollection = db.collection('files');
            return await filesCollection.countDocuments();
        } catch (err) {
            console.error('Error counting files:', err);
            return 0;
        }
    }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;

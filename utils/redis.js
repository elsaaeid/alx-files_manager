// utils/redis.js
import { createClient } from 'redis';
import { promisify } from 'util';

// class to define methods for redis commands
class RedisClient {
  constructor() {
    this.client = createClient();
    // Handle connection errors
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to server: ${err}`);
    });
    // Connect to Redis
    this.client.connect().catch(console.error);
  }

  // Check if the Redis client is alive
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  // Asynchronous function to get a value by key
  async get(key) {
    const getCommand = promisify(this.client.get).bind(this.client);
    const value = await getCommand(key);
    return value;
  }

  // Asynchronous function to set a value with expiration
  async set(key, value, time) {
    const setCommand = promisify(this.client.set).bind(this.client);
    await setCommand(key, value);
    await this.client.expire(key, time);
  }

  // Asynchronous function to delete a value by key
  async del(key) {
    const delCommand = promisify(this.client.del).bind(this.client);
    await delCommand(key);
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;

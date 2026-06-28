import { createClient } from "redis";

const client = createClient({
  username: process.env.REDIS_USER,
  password: process.env.REDIS_KEY,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export async function getCachedData(url) {
  try {
    const response = await client.get(url);
    const data = JSON.parse(response);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function cacheData(url, data) {
  try {
    await client.set(url, JSON.stringify(data), {
      expiration: {
        type: 'EX',
        value: 600
      }
    });

    console.log(`Request for ${url} stored in cache`);
  } catch (error) {
    console.log(error);
  }
}

export async function clearCache() {
  try {
    await client.flushDb("ASYNC");
    console.log('Cache cleared successfully');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
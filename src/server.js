import express from 'express';
import { cacheData, getCachedData } from './cache.js';

export default function CachingProxy() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  function start(options) {
    app.get('/*any', async (req, res) => {
      try {
        const cache = await getCachedData(`${options.url}${req.url}`);

        if (!cache) {
          const response = await fetch(`${options.url}${req.url}`);
          const data = await response.json();

          await cacheData(`${options.url}${req.url}`, data);
          res.set('X-Cache', 'MISS');
          return res.status(response.status).json(data);
        }

        res.set('X-Cache', 'HIT');
        res.status(200).json(cache);
      } catch (error) {
        res.status(500).json({ error: `Error requesting: ${options.url}${req.url}` });
      }
    });

    app.listen(parseInt(options.port), () => {
      console.log(`Caching Proxy Listening on http://localhost:${options.port}`);
    });
  }

  return {
    start
  }
}
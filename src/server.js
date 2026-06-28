import express from 'express';

export default function CachingProxy() {
  const app = express();
  app.use(express.json());

  function start(options) {
    app.get('/*any', async (req, res) => {
      try {
        const response = await fetch(`${options.url}${req.url}`);
        const data = await response.json();

        res.status(response.status).json(data);
      } catch (error) {
        res.status(500).json({ error: `Error requesting: ${this.url}${req.path}` });
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
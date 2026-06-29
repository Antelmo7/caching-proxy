# caching-proxy

A CLI tool that allows to start a Caching Proxy Server, it will forward the requests to the actual server, caching the response and sending it when the same path is requested.

## Instalation and usage

1. Clone the repository from GitHub using `git clone https://github.com/Antelmo7/caching-proxy`
2. Change to the new folder and run `npm install`
3. Use `npm link` to link the CLI Tool to your system
4. Create a .env file with the template from .env-example file and fill the variables with your credentiales from your Redis database

```shell
# Start the server
# caching-proxy -p|--port <number> -u|--url <url>
caching-proxy start -p 3000 -u http://dummyjson.com

# Clear the cache
caching-proxy clear
```

If you do a request to **<http://localhost:3000/products>** the server will forward it to **<http://dummyjson.com/products>**

The response will have headers to indicate the origin from the data:

```plaintext
# If the response is from the cache
X-Cache: HIT

# If the response is from the origin server
X-Cache: MISS
```

## Tech Stack

- Node.js
- Express.js
- Redis
- Dotenv
- Commander

Solution for the [Caching Proxy](https://roadmap.sh/projects/caching-server) challenge rom [roadmap.sh](https://roadmap.sh)

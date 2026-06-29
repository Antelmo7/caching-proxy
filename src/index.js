#!/usr/bin/env node

import 'dotenv/config'
import { Command } from "commander";
import CachingProxy from './server.js';
import { clearCache } from './cache.js';
const program = new Command();

const server = CachingProxy();

program
  .name('caching-proxy')
  .description('A CLI tool that allows to start a Caching Proxy Server, it will forward the requests to the actual server, caching the response and sending it when the same path is requested.')
  .version('1.0.0');

program.command('start')
  .description('Start the caching proxy server')
  .option('-p, --port <integer>', 'Port for the caching proxy server')
  .option('-u, --url <string>', 'URL to forward requests to')
  .action(server.start);

program.command('clear')
  .description('Clear the cache')
  .action(async () => {
    await clearCache();
  });

program.parse();
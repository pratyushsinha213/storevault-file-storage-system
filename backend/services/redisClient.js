import Redis from 'ioredis';

import { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } from '../config/env.js';

const redis = new Redis({
  host: REDIS_HOST || '127.0.0.1',
  port: REDIS_PORT ? parseInt(REDIS_PORT) : 6379,
  username: REDIS_USERNAME || undefined,
  password: REDIS_PASSWORD || undefined,
});

export default redis;
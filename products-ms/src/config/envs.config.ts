import 'dotenv/config';
import * as joi from 'joi';
import { EnvVars } from './config.interfaces';

const envsSchema = joi.object({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required(),
  NATS_SERVERS: joi.array().items(joi.string()).required(),
  JWT_SECRET: joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(",")
});

if (error) throw new Error(`Config env vars validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  natsServers: envVars.NATS_SERVERS,
  jwtSecret: envVars.JWT_SECRET,
};
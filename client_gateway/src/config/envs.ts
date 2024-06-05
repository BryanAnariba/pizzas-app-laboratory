import 'dotenv/config';
import * as joi from 'joi';
import { EnvVars } from './config.interfaces';


const envsSchema = joi.object({
  PORT: joi.number().required(),
  PRODUCT_MS_HOST: joi.string().required(),
  PRODUCT_MS_PORT: joi.number().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config env vars validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  product_ms_host: envVars.PRODUCT_MS_HOST,
  product_ms_port: envVars.PRODUCT_MS_PORT,
};
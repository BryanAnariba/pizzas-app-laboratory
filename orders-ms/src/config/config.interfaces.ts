export interface EnvVars {
  PORT: number;
  MONGO_USER: string;
  MONGO_PASSWORD: string;
  DATABASE_URL: string;
  NATS_SERVERS: string[];
}
export const envConfiguration = () => ({
  port: +process.env.PORT,
  mongodb: process.env.MONGODB,
  dbName: process.env.DB_NAME,
});
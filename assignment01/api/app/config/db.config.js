module.exports = {
  HOST: "localhost",
  USER: "devadmin",
  PASSWORD: "Test@123",
  DB: "devtest",
  PORT: "5566",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
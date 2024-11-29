const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
dotenv.config();

// Імпорт маршрутів
fastify.register(require('./routes/audio'));
fastify.register(require('./routes/form'));
fastify.register(require('./routes/stock'));

connectDB();
// Запуск сервера
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    console.log(`Server is running at http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

module.exports = fastify;
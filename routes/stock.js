const StockService = require('../services/stockService');

module.exports = async (fastify) => {
  fastify.get('/stock', async (req, reply) => {
    try {
      const { symbol } = req.query;
      const data = await StockService.getStockData(symbol);
      reply.send({ success: true, data });
    } catch (err) {
      reply.code(500).send({ success: false, error: err.message });
    }
  });
};
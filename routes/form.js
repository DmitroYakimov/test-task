const FormService = require('../services/formService');

module.exports = async (fastify) => {
  fastify.post('/form', async (req, reply) => {
    try {
      const result = await FormService.saveFormData(req.body);
      reply.send({ success: true, data: result });
    } catch (err) {
      reply.code(400).send({ success: false, error: err.message });
    }
  });
};
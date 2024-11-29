const audioService = require('../services/audioService');

module.exports = async (fastify) => {

  function handle (socket, req) {
    socket.on('message', (data) => socket.send(data)) 
  }
  
  fastify.register(require('@fastify/websocket'), {
    handle,
    options: { maxPayload: 1048576 }
  })
  
  fastify.register(async function () {
    fastify.route({
    method: 'GET',
    url: '/audio',
    handler: (req, reply) => {
      reply.send({ message: 'WebSocket endpoint. Use a WebSocket client to connect.' });
    },
    wsHandler: (socket) => {
      console.log('WebSocket connection established.');

      let isConversationActive = false;

      // Обробка повідомлень від клієнта
      socket.on('message', async (message) => {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.action === 'start') {
          isConversationActive = true;
          console.log('Conversation started.');

          socket.send(JSON.stringify({
            status: 'success',
            message: 'Conversation started.',
          }));
        } else if (parsedMessage.action === 'end') {
          isConversationActive = false;
          console.log('Conversation ended.');

          socket.send(JSON.stringify({
            status: 'success',
            message: 'Conversation ended.',
          }));
        } else if (isConversationActive && parsedMessage.audio) {
          console.log('Processing audio data...');
          const response = await audioService.processAudio(parsedMessage.audio);

          socket.send(JSON.stringify({
            status: 'success',
            response,
          }));
        } else {
          socket.send(JSON.stringify({
            status: 'error',
            message: 'Invalid action or conversation not started.',
          }));
        }
      });

      socket.on('close', () => {
        console.log('WebSocket connection closed.');
      });
    },
  });
  })
};
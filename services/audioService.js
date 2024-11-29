const axios = require('axios');

const processAudio = async (audioData) => {
  try {
    // Надсилання аудіоданих до OpenAI Realtime API
    const response = await axios.post(
      'https://api.openai.com/v1/realtime/audio', // URL OpenAI API
      {
        audio: audioData,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Повернення оброблених даних
    return response.data;
  } catch (err) {
    console.error('Error processing audio with OpenAI:', err.message);
    return { error: 'Failed to process audio' };
  }
};

module.exports = { processAudio };
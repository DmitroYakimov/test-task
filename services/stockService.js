const axios = require('axios');

const getStockData = async (symbol) => {
  const apiKey = process.env.STOCK_API_KEY; // Ключ API
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`;

  const response = await axios.get(url);
  return response.data;
};

module.exports = { getStockData };
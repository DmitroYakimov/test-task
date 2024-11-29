const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
});

const FormModel = mongoose.model('Form', FormSchema);

const saveFormData = async (data) => {
  const form = new FormModel(data);
  return await form.save();
};

module.exports = { saveFormData };
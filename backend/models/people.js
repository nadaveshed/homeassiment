const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { typee: String, required: true }

});

module.exports = mongoose.model('People', peopleSchema);

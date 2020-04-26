const mongoose = require("mongoose");

const availableIds = new mongoose.Schema({
  id: Number,
  shema: String
});

const AvailableId = mongoose.model("AvailableId", availableIds, 'availableIds');

module.exports = AvailableId;
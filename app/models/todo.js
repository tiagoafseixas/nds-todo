var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
  title: String,
  duedate: Date,
  duetime: String,
  insertDate: { type: Date, default: Date.now },
  completed: {type: Boolean, default: false },
  description: String
});

module.exports = mongoose.model('Todo', todoSchema);
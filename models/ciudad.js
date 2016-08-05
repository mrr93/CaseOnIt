var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ciudad = new Schema({
  ts:    { type: Date, default: Date.now },
  city:   { type: String },
  population : [
	{
		age: {type: Number},
		count:{type: Number}
	}  
  ]     
});

module.exports = mongoose.model('Ciudad', Ciudad);
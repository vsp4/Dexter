var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	initialStandId: String,
	userId: String,
	busId: String,
	name: String,
	creditedAmount: Number,
	startingTime: { type: Date },
	endTime: { type: Date },
	finalStandId: String,
	amountCharged: Number
});


module.exports = mongoose.model('User', userSchema);

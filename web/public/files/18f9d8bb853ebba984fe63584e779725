var mongoose = require('mongoose');

var flightDetailsschema = new mongoose.Schema({
	flightNo: String,
	gate: String,
	flightArrival_time: { type: Date },
	flightDeparture_time: { type: Date }
})

module.exports = mongoose.model('flightDetails', flightDetailsschema)


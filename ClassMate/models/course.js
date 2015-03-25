var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    description: { type: String },
    participants: [{ user: {type: Schema.Types.ObjectId, ref: 'User' }}],
    classes: [{
    	date: { type: Date, required: true },
    	location: { type: String },
    	description: { type: String },
    	messages: [{
    		user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    		message: { type: String },
    		time: { type: Date, default: Date.now }
    	}],
    	attendances: [{
    		user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    		reason: { type: String },
    		attendance: { type: Number, default: 0 }, // 0 = present. 1 = too late. 2 = absent
    		time: { type: Date, default: Date.now },
    		arrivalTime: { type: Date },
    		location : {
    			type: [Number], // [<longitude>],[<latitude>]
    			index: '2d' // create the geospatial index
    		}
    	}]
    }]
});

module.exports = mongoose.model('Course', courseSchema);
"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var CarParkSchema = new Schema({
    id: { type: Number, required: 'Provide an id' },

    name: { type: String, required: 'Please enter the parking\'s name.', trim: true },

    serviceUrl: { type: String, trim: true },

    serviceId: { type: String },

    description: { type: String },

    position: { type: String, required: true },

    geometry: { 'type': String },

    cancelGraceSecs: { type: Number },

    openingHours: {type: String },

    paymentParking: { type: Boolean },

    paymentManaged: { type: Boolean },

    priceInfo: { type: String },

    limitedTimeParking: { type: Boolean },

    services: [{ type: String }],
});

module.exports = mongoose.model('CarPark', CarParkSchema);
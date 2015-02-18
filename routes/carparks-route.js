"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CarPark = mongoose.model('CarPark');


// Get carParks
router.get('/', function(req, res) {
    CarPark.find(function(err, carParks) {
        if (err) return res.json('Could not get car parks.');
        return res.json(carParks);
    });
});


// Get carPark
router.get('/:id', function(req, res) {
    var carParkId = req.params.id;

    return res.json('Hello, you used GET /' + pollId);
});


// New carPark
router.post('/', function(req, res) {
    var carPark = new CarPark(req.body);
    carPark.save(function(err) {
        if (err) return res.json('You made a mistake.' + err);
        return res.json(carPark);
    });
});



module.exports = router;

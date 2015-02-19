"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CarPark = mongoose.model('CarPark');


// Get carParks
router.get('/', function(req, res) {
    CarPark.find(function(err, carParks) {
        if (err) return res.status(500).json('Could not get car parks.');
        return res.json(carParks);
    });
});


// Get carPark
router.get('/:id', function(req, res) {
    var carParkId = req.params.id;
    CarPark.findOne( { 'id': carParkId }, function(err, carPark) {
        if (err) return res.json('Could not get car park with id ' + id);
        return res.json(carPark);
        // if (carParkId !== 1) {
        //     return res.json(carPark);
        // }
        // connectToSql(function(err) {
        //     if (err) return res.status(500).json('Could not connect to SQL', err);
        //     sql.query('SELECT * FROM XXX', function(err, avail) {
        //         if (err) return res.status(500).json('Could not get available parking slots', err);
        //         carPark.parkingSlots = {
        //             ts: new Date(),
        //             available: avail 
        //         };
        //         return res.json(carPark);
        //     });
        // })
    });
});


// New carPark
router.post('/', function(req, res) {
    var carPark = new CarPark(req.body);
    carPark.save(function(err) {
        if (err) return res.status(500).json('You made a mistake.' + err);
        return res.json(carPark);
    });
});



module.exports = router;

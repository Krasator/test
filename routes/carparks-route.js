"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var mongoose = require('mongoose');
var CarPark = mongoose.model('CarPark');


// Get carParks
router.get('/', function(req, res) {
    CarPark.find(function(err, carParks) {
        if (err) return res.status(500).json('Could not get car parks. ' + err);
        return res.json(carParks);
    });
});


// Get carPark
router.get('/:id', function(req, res) {
    var carParkId = req.params.id;
    if (!carParkId) return res.status(400).json('You must provide an id');

    CarPark.findOne( { 'id': carParkId }, function(err, carPark) {
        if (err) return res.status(500).json('Could not get car park with id ' + carParkId);
        if (!carPark) return res.status(404).json('Could not find car park with id ' + carParkId);
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
    var carParkId = carPark.id;

    CarPark.findOne( { 'id': carParkId }, function(err, tpmCarPark) {
        if (err) return res.status(500).json('Could not get car park with id ' + carParkId);
        if (tpmCarPark) return res.status(400).json('Car park with id ' + carParkId + ' already exists.');

        carPark.save(function(err) {
            if (err) return res.status(500).json('Could not save carpark. ' + err);
            return res.json(carPark);
        });
    });
});



// Edit carPark
router.put('/:id', function(req, res) {
    var carParkId = req.params.id;
    if (!carParkId) return res.status(400).json('You must provide an id');

    CarPark.findOne( { 'id': carParkId }, function(err, carPark) {
        if (err) return res.status(500).json('Error getting car park. ' + err);
        if (!carPark) return res.status(404).json('Could not find car park with id ' + carParkId);
        carPark = _.extend(carPark, req.body);
        carPark.save(function(err) {
            if (err) return res.status(500).json('Could not update carpark with id ' + carParkId + '. ' + err);
            return res.json(carPark);
        });
    });
});


// Get carPark
router.delete('/:id', function(req, res) {
    var carParkId = req.params.id;
    if (!carParkId) return res.status(400).json('You must provide an id');

    CarPark.remove( { 'id': carParkId }, function(err) {
        if (err) return res.json('Could not delete car park with id ' + carParkId);
        return res.sendStatus(200);
    });
});



module.exports = router;

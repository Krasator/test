"use strict";

var express = require('express');
var router = express.Router();


// Get polls
router.get('/', function(req, res) {
    return res.json('Hello, you used GET /');
});


// Get poll
router.get('/:poll_id', function(req, res) {
    var pollId = req.params.poll_id;

    return res.json('Hello, you used GET /' + pollId);
});


// New Poll
router.post('/', function(req, res) {
    var body = req.body;
    console.log(req.body);
    return res.json({ string: 'Hello, you used POST / ......... Body:',
                      body: body });
});



module.exports = router;

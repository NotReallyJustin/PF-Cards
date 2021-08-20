const router = require('express').Router();
const { db } = require('./mongo.js');
const fs = require('fs');

router.get('/', (req, res) => {
    var date = req.query.date;
    var brief = req.query.brief;

    if (typeof date != 'string' || typeof brief != 'string')
    {
        res.status(404).send("Input error with API call - please check the query provided.");
        res.end();
    }
    else
    {
        //How do I return a file help
        //Download time!!!!!!! YEAAAHHH!
    }
});
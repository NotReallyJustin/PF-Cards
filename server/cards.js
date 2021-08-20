const router = require('express').Router();
const { db } = require('./mongo.js');

router.get('/', (req, res) => {
    var name = req.query.name;
    var date = req.query.date;
    var tag = req.query.tag;

    var col = [name, date, tag];

    let allStr = true;
    let oneDefined = false;
    for (var i of col)
    {
        if (i != undefined)
        {
            oneDefined = false;

            if (typeof i != 'string')
            {
                allStr = false;
            }
        }
    }

    if (!oneDefined)
    {
        res.status(404).send("Please insert at least one API query.");
        res.end();
    }
    else if (!allStr)
    {
        res.status(404).send("Input type error");
    }
    else
    {
        //Return stuff o.o
    }
});
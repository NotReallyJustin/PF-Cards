const router = require('express').Router();
const { db } = require('./mongo.js');
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    var date = req.query.date;
    var brief = req.query.name;

    if (typeof date != 'string' || typeof brief != 'string')
    {
        res.status(404).send("Input error with API call - please check the query provided.");
        res.end();
    }
    else
    {
        var e = `./Briefs/${date.replace('/', '-')} ${brief.replace(/\+/gmi, ' ')}.pdf`;
        var directory = path.resolve(__dirname, e);
        fs.access(directory, fs.constants.F_OK, err => {
            if (err)
            {
                res.status(404).send('File does not exist');
                res.end();
            }
            else
            {
                res.download(directory, err => {
                    console.log(err)
                    if (err && !res.headersSent)
                    {
                        res.status(404).send('File does not exist');
                    }
                });
            }
        });
    }
});

module.exports = router;
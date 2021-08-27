const router = require('express').Router();
const { db } = require('./mongo.js');
const collection = db.collection('Cards');

router.get('/', (req, res) => {
    var name = req.query.name;
    var date = req.query.date.replace(/\-/gmi, '/');
    var tag = req.query.tag;

    var col = [name, date, tag];

    let allStr = true;
    let oneDefined = false;
    for (var i of col)
    {
        if (i != undefined && /\w/gm.test(i))
        {
            oneDefined = true;

            if (typeof i != 'string')
            {
                allStr = false;
            }
        }
    }

    if (!oneDefined)
    {
        res.status(404).send("Please insert at least one API query.");
    }
    else if (!allStr)
    {
        res.status(404).send("Input type error");
    }
    else
    {
        var query = {};
        if (date) query.date = date;
        if (tag) query.tag = tag;

        let result;
        if (name)
        {
            query['$text'] = {'$search': name};
            result = collection.find(
                query,
                {'score': {'$meta': 'textScore'}}
            ).sort({'score': {'$meta': 'textScore'}}).limit(15);
        }
        else
        {
            result = collection.find(
                query
            ).limit(15);
        }

        let retArr = [];

        result.forEach(doc => {
            retArr.push({
                caption: doc.name,
                tag: doc.bib,
                text: doc.content
            });
        }).then(() => {
            //console.dir(retArr);
            res.json(retArr);
        });
    }
});

module.exports = router;
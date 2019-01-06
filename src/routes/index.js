const express = require('express');
const router = express.Router();

const File = require('../models/file');

router.get('/', async (req, res) => {
    const files = await File.find();
    console.log(files);
    res.render('index', {
        files:files
    });
});

router.post('/addfile', async (req, res) => {
    const file = await new File(req.body);
    file.save()
        .then(file => console.log(file))
        .catch(err => console.log(err));
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
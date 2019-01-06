const express = require('express');
const router = express.Router();

const File = require('../models/file');

router.get('/', async (req, res) => {
    const files = await File.find();
    console.log(files);
    res.render('index', {
        files
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

router.get('/delfile/:id', async (req, res) => {
    const { id } = req.params;
    await File.remove({_id: id});
    res.redirect('/');
});

router.get('/editfile/:id', async (req, res) => {
    const { id } = req.params;
    const file = await File.findById({_id: id});
    res.render('file/file_edit', {
        file
    });
});

router.post('/editfile/:id', async (req, res) => {
    const { id } = req.params;
    await File.update({_id: id}, req.body);
    res.redirect('/');
});

module.exports = router;
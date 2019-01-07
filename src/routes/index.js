const express = require('express');
const router = express.Router();

const File = require('../models/file');
const Group = require('../models/group');

router.get('/group', async (req, res) => {
    const groups = await Group.find();
    res.render('group/group', {
        groups
    });
});


router.get('/', async (req, res) => {
    const files = await File.find();
    res.render('index', {
        files
    });
});

// Files 

router.post('/addfile', async (req, res) => {
    const file = await new File(req.body);
    file.save()
        .then(file => console.log(file))
        .catch(err => console.log(err));
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

// Groups

router.post('/addgroup', async (req, res) => {
    const group = await new Group(req.body);
    group.save()
        .then(group => console.log(group))
        .catch(err => console.log(err));
    res.redirect('/group');
});

router.get('/delgroup/:id', async (req, res) => {
    const { id } = req.params;
    await Group.remove({_id: id});
    res.redirect('/group');
});

router.get('/editgroup/:id', async (req, res) => {
    const { id } = req.params;
    const group = await Group.findById({_id: id});
    res.render('group/group_edit', {
        group
    });
});

router.post('/editgroup/:id', async (req, res) => {
    const { id } = req.params;
    await Group.update({_id: id}, req.body);
    res.redirect('/group');
});

module.exports = router;
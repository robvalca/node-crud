const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    path: String,
    size: Number
});

module.exports = mongoose.model('files', FileSchema);
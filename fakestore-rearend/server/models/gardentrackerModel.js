const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gardentrackerSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});
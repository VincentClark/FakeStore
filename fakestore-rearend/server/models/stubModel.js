const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    {
        "id": "0",
        "title": "Scrub Jay Test Video",
        "video_id": "sjtv01",
        "src": "scrubjay",
        "poster": "scrubjay_poster.png",
        "icon": "scrubjay_icon.png",
        "description": "This is a test video of a friendly scrubjay",
        "defaultControls": true,
        "creator": "Vincent Clark",
        "upvotes": 0,
        "comments":[]
    },
*/
const videoStubSchema = new Schema({
    title: { type: String, required: true },
    video_id: { type: String, required: true },
    src: { type: String, required: true },
    poster: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    defaultControls: { type: Boolean, required: true },
    creator: { type: String, required: true },
    url: { type: String, required: false },
    service: { type: String, required: true },
    upvotes: { type: Number, required: true },
    views: { type: Number, required: false },
    tags: [],
    comments: []

}, { timestamps: true });

// const stubModel = mongoose.model('videoStub', videoStubSchema);



module.exports = mongoose.model('videostub', videoStubSchema, 'fsvideodev');
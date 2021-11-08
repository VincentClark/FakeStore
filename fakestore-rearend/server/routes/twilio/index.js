const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const cors = require('cors');
module.exports = (params) => {
    router.get('/test', (req, res) => {
        res.send('test');
    });
    return router
}


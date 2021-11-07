const express = require('express');
const path = require('path');
const router = express.Router();
const { mongo, mongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const dbase = mongoose.connection;
const { request } = require('http');
/*
    * Setting up routes for garden tracker
*/
module.exports = (params) => {
    const { gardentracker } = params;
    router.get('/', (req, res) => {
        return res.status(200).json({
            message: 'Garden Tracker API'
        });
    });

    return router;
}
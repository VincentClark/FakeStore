const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
module.exports = (params) => {
    const { build } = params;
    console.log("Build ", build);
    const build_path = path.join(__dirname, "../", "../", '/build/index.html');
    console.log(build_path)
    router.get('*', async (req, res) => {
        return res.sendFile(build_path);
    })
    return router;
}

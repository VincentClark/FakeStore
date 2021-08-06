const multer = require('multer');
//not sure if I need this. 
const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024 * 1024,
    },
});

module.exports.uploads = uploads;
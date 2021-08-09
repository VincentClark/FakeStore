const multer = require('multer');
const filepath = "/home/vincentclark/FakeStore/fakestore-rearend/server/media_library/videos/video_upload/"
const upload = multer({
    dest: filepath,
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, filepath);
        }
    }),
});

module.exports.handleIcon = icons => async (req, res, next) => {
    if (!req.file) return next();
    req.file.storeFileName = await icons.storeFileName(req.file.buffer);
    next();
};
const mongoose = require('mongoose');

//revise
module.exports.connect = async dsn => mongoose.connect(dsn, {useNewUrlParser: true, useUnifiedTopology: true });

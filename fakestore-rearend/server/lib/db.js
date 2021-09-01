const { mongoClient, MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/fsvideodatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => {
        console.log('Connected to MongoDB');

    })
    .catch((err) => {
        console.log(`ERROR from WWW ==> ${err}`);
    });



// const client = MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
// const db = client.db('fs-videodev')
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.log(`ERRO from WWW ==> ${err}`);
//   });
module.exports.connect = async db => mongoose.connect(db);

//revise
//module.exports.connect = async dsn => mongoose.connect(dsn, {useNewUrlParser: true, useUnifiedTopology: true });


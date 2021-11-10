require('dotenv').config();
const path = require('path');

module.exports = {
    development: {
        sitename: "FakeStore [Development]",
        data: {
            hold: "Hold",
        },
        database: {
            hold: "Hold",

        }
    },
    account: {
        TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
        TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    }
}
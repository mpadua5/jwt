const mongoose = require('../../database');
const user = require('./user');

const User = mongoose.model('User', mongoose.Schema(user));

module.exports = {
    User
}



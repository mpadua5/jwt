const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}/noderest`, { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promisse = global.Promise;

module.exports = mongoose;
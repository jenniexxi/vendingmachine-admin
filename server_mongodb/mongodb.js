module.exports = function() {
  
    const mongoose = require('mongoose');
    const db = mongoose.connection; //mongoose랑 db연결

    db.on('error', function() {
        console.log('Connected failed');
    });
    db.once('open', function() {
        console.log('Connected to mongooed server');
    });

    mongoose.connect('mongodb://localhost/mongodb_tutorial');
  
};
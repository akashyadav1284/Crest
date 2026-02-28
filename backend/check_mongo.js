const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://akashyadav9992462520_db_user:340515%401284%24@crestdb.z6snmse.mongodb.net/crestDB?retryWrites=true&w=majority', { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log("MONGO_SUCCESS: Connected successfully");
        process.exit(0);
    })
    .catch(err => {
        console.error("MONGO_ERROR:", err.message);
        process.exit(1);
    });

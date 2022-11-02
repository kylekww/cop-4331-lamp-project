const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
    path: path.join(__dirname, '.env'),


});

const app = require("./app");

const {
    PORT,
    DATABASE_CONNECTION_STRING: DATABASE_CONNECTION_STRINGS,
} = require("./configs");



mongoose.connect(DATABASE_CONNECTION_STRINGS).then(()=>{
    console.log('database connected')

    app.listen(PORT,() => {
        console.log(`sever started listening on port ${PORT}...`)
    });
});

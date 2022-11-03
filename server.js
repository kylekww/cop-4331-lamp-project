const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config({
    path: path.join(__dirname, '.env'),


});

const app = require("./app");
app.use(cors());


const {
    PORT,
    DATABASE_CONNECTION_STRING: DATABASE_CONNECTION_STRINGS,
} = require("./configs");


app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

mongoose.connect(DATABASE_CONNECTION_STRINGS).then(()=>{
    console.log('database connected')

    app.listen(PORT,() => {
        console.log(`sever started listening on port ${PORT}...`)
    });
});

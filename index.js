const express = require('express');
require('dotenv').config(); 
const urlRoute = require('./routes/url');
const {connectToMongoDb} = require('./connection');


const app = express();
const PORT = process.env.PORT || 3000;

connectToMongoDb(process.env.Mongo_Uri)
.then(() => console.log('MongoDb connected...'))
.catch((err) => console.log(`Error: ${err}`));


app.use(express.json());
app.use("/url",urlRoute);

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});



const express = require('express');
require('dotenv').config(); 
const urlRoute = require('./routes/url');
const URL  = require('./models/url');
const {connectToMongoDb} = require('./connection');


const app = express();
const PORT = process.env.PORT || 3000;

// connect to mongodb
connectToMongoDb(process.env.Mongo_Uri)
.then(() => console.log('MongoDb connected...'))
.catch((err) => console.log(`Error: ${err}`));

// middle wares
app.use(express.json());
app.use("/url",urlRoute);


app.get('/:shortId', async(req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, {$push: {
        visitHistory: {
            timeStamp: Date.now(),
        },
    },
   });

   res.redirect(entry.redirectUrl);
});


app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});



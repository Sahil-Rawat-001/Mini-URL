const express = require('express');
require('dotenv').config(); 
const urlRoute = require('./routes/url');
const URL  = require('./models/url');
const {connectToMongoDb} = require('./connection');
const path = require('path');
const staticRouter = require('./routes/staticRouter');


const app = express();
const PORT = process.env.PORT || 3000;

// connect to mongodb
connectToMongoDb(process.env.Mongo_Uri)
.then(() => console.log('MongoDb connected...'))
.catch((err) => console.log(`Error: ${err}`));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

// middle wares
app.use(express.json()); // for parsing json data
app.use(express.urlencoded({extended: false})); // for parsing form data

app.use("/url",urlRoute);
app.use('/',staticRouter);


app.get('/test', async (req,res) => {
    const allUrls = await URL.find({}); // provide me all urls

    return res.render('home', {
        urls: allUrls,
    });
})

app.get('/url/:shortId', async(req,res) => {
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



const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wc0z7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
    try{
        await client.connect();
        const database = client.db("Destination");
        const destinationCollection = database.collection('destinations');
        const bookingCollection = database.collection('allBookings');
        app.get('/destinations', async (req, res) => {
            const cursor = destinationCollection.find({});
            const destinations = await cursor.toArray();
            console.log(destinations)
            res.send(destinations);
        })
        app.get('/allBookings', async (req, res) => {
            const cursor = bookingCollection.find({});
            const bookings = await cursor.toArray();
            console.log(bookings)
            res.send(bookings);
        })
        app.post('/destinations', async(req, res) => {
            const destination = req.body;
            console.log(destination);
            const result = await destinationCollection.insertOne(destination);
            console.log(result)
            res.json(result);
        })
    }finally {
        
    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('ok');
})

app.listen(port, ()=> {
    console.log("connected")
})
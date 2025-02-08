import express from 'express';
import bodyParser from 'body-parser';
import { VandorRoute } from './routes/VandorRoute';
import { AdminRoute } from './routes/AdminRoute'
import mongoose from 'mongoose';
import { MONGO_URL } from './config';

const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/vandor', VandorRoute);
app.use('/admin', AdminRoute);

// connecting mongoose DB 
mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB: MongoServerError: bad auth : authentication failed', err));

app.listen(8000, () => {
    console.clear()
    console.log("App is Listening to the port 8000")
})
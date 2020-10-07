import * as express from 'express';
import { userRoute } from './routes/userRoutes';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { MongoConnect } from './db/db';

dotenv.config()

const app = express();



// body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// db config


app.use('/user', userRoute)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    MongoConnect.connect().then((res) => console.log('db connected')).catch(err => console.log(err))
    console.log(`Server running on ${port}`)
})
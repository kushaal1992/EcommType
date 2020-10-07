import * as mongoose  from 'mongoose';

export class MongoConnect {
    static connect(){
        const db = process.env.MongoURI || '';
        return mongoose.connect(db, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useFindAndModify: false,
            useCreateIndex: true
        })
    }
}


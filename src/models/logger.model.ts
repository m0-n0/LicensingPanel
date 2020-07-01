import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';

interface ILogger extends mongoose.Document {
    ip: String,
    method: String,
    path: String,
    body: String,
    date: Date,
}

var Logger = new Schema({
    ip: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date:{
        type: Number,
        required: true
    }
});


export default mongoose.model<ILogger>('Logger', Logger);

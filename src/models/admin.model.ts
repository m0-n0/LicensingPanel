import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
export interface IAdmin extends mongoose.Document {
    username: String,
    password: String,
};

var Admin = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


export default mongoose.model<IAdmin>('Admin', Admin);

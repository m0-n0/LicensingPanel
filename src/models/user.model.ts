import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';

export interface IUser extends mongoose.Document {
    hwid: string,
    userIp: string,
    info: string,
    auth: Array<String>,
    Active: Boolean,
    ChangedIp: Boolean,
}

var User = new Schema({
    hwid: {
        type: String,
        required: true
    },
    userIp: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    auth: {
        type: Array,
        default: new Array<String>(),
    },
    Active: {
        type: Boolean,
        required: true,
        default: false
    },
    ChangedIp: {
        type: Boolean,
        required: true,
        default: false
    },
});
User.virtual('ip')
    .set(function (ip: String) {
        this.userIp = ip.replace(/ /g,'');
    })
    .get(function () { return this.userIp; });

export default mongoose.model<IUser>('User', User);

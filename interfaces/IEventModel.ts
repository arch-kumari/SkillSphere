import Mongoose = require("mongoose");
import {IUserModel} from './IUserModel';

interface IEventModel extends Mongoose.Document {
    eventID: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    organizerID: string;
    participants: Array<IUserModel>;
}
export {IEventModel};
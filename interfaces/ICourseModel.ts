import Mongoose = require("mongoose");
import { IScheduleModel } from './IScheduleModel';

interface ICourseModel extends Mongoose.Document {
    courseID: string;
    courseName : string;
    title: string;
    description: string;
    categoryID: string;
    instructorID: string;
    userID: string;
    price: number;
    courseImage:string;
    schedule: Array<IScheduleModel>;
  }

export {ICourseModel};
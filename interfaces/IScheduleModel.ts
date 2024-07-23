import Mongoose = require("mongoose");

interface IScheduleModel extends Mongoose.Document {
    courseID: string;
    instructorID: string;
    date: Date;
    startTime: string;
    endTime: string;
    location: string;
  }

export {IScheduleModel};
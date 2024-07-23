import  IScheduleModel  from './IScheduleModel';

interface ICourseModel{
    courseID: string;
    courseName : string;
    title: string;
    description: string;
    categoryID: number;
    instructorID: string;
    price: number;
    courseImage:string;
    userID:String;
    schedule: Array<IScheduleModel>;
  }

export default ICourseModel;
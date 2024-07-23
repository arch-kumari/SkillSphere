import Mongoose = require("mongoose");
import { IUserModel } from './IUserModel';
import { ICourseModel } from './ICourseModel';

interface IStudentModel extends IUserModel {
  studentID: string;
  userID: string;
  studentName: string;
  email: string;
  phoneNo: number;
  enrolledCourses: Array<ICourseModel>;
  profileImage: string;
  registrationDate: Date;
}

export {IStudentModel};
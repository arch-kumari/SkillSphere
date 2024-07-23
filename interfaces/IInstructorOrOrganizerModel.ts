import Mongoose = require("mongoose");
import { IUserModel } from './IUserModel';

interface IInstructorOrOrganizerModel extends IUserModel {
  instructorID: string;
  userID: string;
  name: String;
  email: string;
  phoneNo: number;
  expertise: string;
  experience: number;
  bio: string;
  rating: number;
  profileImage: string;
  registrationDate: Date;
}

export {IInstructorOrOrganizerModel};

import  IUserModel  from './IUserModel';
import  ICourseModel  from './ICourseModel';

interface IStudentModel {
  studentID: number;
  userID: number;
  studentName: string;
  email: string;
  phoneNo: number;
  enrolledCourses: Array<ICourseModel>;
  profileImage: string;
  registrationDate: Date;
}

export default IStudentModel;
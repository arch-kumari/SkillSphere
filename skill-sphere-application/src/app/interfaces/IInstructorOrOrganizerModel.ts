import IUserModel from './IUserModel';

interface IInstructorOrOrganizerModel {
  instructorID: string;
  userID: string;
  name: string;
  email: string;
  phoneNo: number;
  expertise: string;
  experience: number;
  bio: string;
  rating: number;
  profileImage: string;
  registrationDate: Date;
}

export default IInstructorOrOrganizerModel;
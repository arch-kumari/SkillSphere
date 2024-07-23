import IUserModel from './IUserModel';

interface IEventModel{
    eventID: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    organizerID: number;
    participants: Array<IUserModel>;
}
export default IEventModel;
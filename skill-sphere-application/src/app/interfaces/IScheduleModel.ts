interface IScheduleModel{
    courseID: number;
    instructorID: number;
    date: Date;
    startTime: string;
    endTime: string;
    location: string;
  }

export default IScheduleModel;
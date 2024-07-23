import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IInstructorOrOrganizerModel from '../interfaces/IInstructorOrOrganizerModel';
import ICourseModel from '../interfaces/ICourseModel';
import { environment } from '../../../../environments/environments'; 
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorDashboardService {

  constructor(private httpClient: HttpClient,private loggingService: LoggingService) { }

  getInstructor() {
    return this.httpClient.get<IInstructorOrOrganizerModel[]>( environment.hostUrl + '/api/user');
  }

  updateInstructor(instructorID: string,updateProfile: IInstructorOrOrganizerModel){
    this.loggingService.log('InstructorsDetails updated successfully.....................////...................'+environment.hostUrl + '/api/instructorProfile/'+instructorID);
    return this.httpClient.put<IInstructorOrOrganizerModel>( environment.hostUrl + '/api/instructorProfile/'+instructorID, updateProfile);
  }

  getCourses() {
    return this.httpClient.get<ICourseModel[]>( environment.hostUrl + '/api/dashboardCourse');
  }

  createNewCourse(course: ICourseModel) {    
    return this.httpClient.post<ICourseModel>( environment.hostUrl + '/api/course', course);
  }

  updateCourse(courseID: string,course: ICourseModel) {    
    return this.httpClient.put<ICourseModel>( environment.hostUrl + '/api/course/'+courseID, course);
  }

  deleteCourse(courseID: string) {    
    return this.httpClient.delete<void>( environment.hostUrl + '/api/course/'+ courseID);
  }

}

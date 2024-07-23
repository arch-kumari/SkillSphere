import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  IInstructorOrOrganizerModel  from '../interfaces/IInstructorOrOrganizerModel';
import ICourseModel from '../interfaces/ICourseModel';
import { environment } from '../../../../environments/environments'; 

@Injectable({
  providedIn: 'root'
})
export class CoachesService {

  constructor(private httpClient: HttpClient) { }
  
  getInstructorNameUsingId(instructorID: string) {    
    return this.httpClient.get<IInstructorOrOrganizerModel[]>( environment.hostUrl + '/api/instructorNameUsingID/'+ instructorID);
  }

  getInstructors() {    
    return this.httpClient.get<IInstructorOrOrganizerModel[]>( environment.hostUrl + '/api/instructors');
  }

}

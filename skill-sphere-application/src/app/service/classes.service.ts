import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  ICourseModel  from '../interfaces/ICourseModel';
import { environment } from '../../../../environments/environments'; 
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private httpClient: HttpClient,private loggingService:LoggingService) { }
  
  getCourses() {
    this.loggingService.log(environment.hostUrl + '/api/courses');
    return this.httpClient.get<ICourseModel[]>( environment.hostUrl + '/api/courses');
  }
}

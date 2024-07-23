import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  ICourseModel  from '../interfaces/ICourseModel';
import { environment } from '../../../../environments/environments'; 

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  
  constructor(private httpClient: HttpClient) { }
  
  getCourse(courseName: string) {
    console.log(environment.hostUrl + '/api/course/'+ courseName);
    return this.httpClient.get<ICourseModel>( environment.hostUrl + '/api/course/'+ courseName );
  }
}

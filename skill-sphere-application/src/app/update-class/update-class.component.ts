import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorDashboardService } from '../service/instructor-dashboard.service';
import ICourseModel from '../interfaces/ICourseModel';
import { ClassService } from '../service/class.service';
import { LoggingService } from '../service/logging.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrl: './update-class.component.css'
})
export class UpdateClassComponent  implements OnInit {
  courseName: string = '';
  course: ICourseModel = {
    courseID: '',
    courseName: '',
    title: '',
    description: '',
    categoryID: 0,
    instructorID: '',
    price: 0,
    courseImage: '',
    schedule: [],
    userID: ''
  };
  state: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instructorDashboardService: InstructorDashboardService,
    private classService : ClassService,
    private loggingService : LoggingService,private location: Location
  ) {    
    const navigation = this.router.getCurrentNavigation();
    this.state =  navigation?.extras.state as { courseName: string};
    this.loggingService.log('Update class info: ' + JSON.stringify(this.state));
    if (this.state) {
      this.courseName = this.state.courseName;
    }else {
      this.loggingService.log('State is empty or undefined');
    }
    this.loggingService.log('Const courseName'+this.courseName);
  }

  ngOnInit(): void {
    this.classService.getCourse(this.courseName).subscribe(course => {
      this.course = course;
    });
  }

  updateCourse(): void {
    this.instructorDashboardService.updateCourse(this.course.courseID, this.course).subscribe(
      () => {
        this.loggingService.log('Course updated successfully');
        this.router.navigate(['/instructor/dashboard']);
    },       
    error => console.error('Error updating course:', error)
    );
  }

  goBack(): void {
    this.location.back();
  }
}

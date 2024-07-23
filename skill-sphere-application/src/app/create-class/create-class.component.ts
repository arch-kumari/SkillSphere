import { Component } from '@angular/core';
import ICourseModel from '../interfaces/ICourseModel';
import IScheduleModel from '../interfaces/IScheduleModel';
import { CoachesService } from '../service/coaches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorDashboardService } from '../service/instructor-dashboard.service';
import { LoggingService } from '../service/logging.service';
import { InstructorDashboardComponent } from '../instructor-dashboard/instructor-dashboard.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.css',
  providers: [InstructorDashboardService,LoggingService]
})
export class CreateClassComponent {
  newCourse: ICourseModel = {
    courseID: '',
    courseName: '',
    title: '',
    description: '',
    categoryID: 0,
    instructorID: '', // Example instructor ID, replace with actual logic
    userID:'',
    price: 0,
    courseImage: '',
    schedule: [] as IScheduleModel[]
  };

  state: any;

  constructor(private instructorDashboardService: InstructorDashboardService, private router: Router,
    private loggingService:LoggingService,private location: Location
    ) {
      const navigation = this.router.getCurrentNavigation();
      this.state =  navigation?.extras.state as { userID: string; instructorID: string };
      this.loggingService.log('Create class info: ' + JSON.stringify(this.state));
      if (this.state) {
        this.newCourse.instructorID = this.state.instructorID;
        this.newCourse.userID = this.state.userID;
      }else {
        this.loggingService.log('State is empty or undefined');
      }
      }

    ngOnInit(): void { }

  createCourse(): void {
    this.instructorDashboardService.createNewCourse(this.newCourse).subscribe(
      () => {
        this.loggingService.log('Course created successfully');
        const courseInfo = JSON.stringify(this.newCourse);
        this.loggingService.log('New Course Info: ' + courseInfo);
        this.router.navigate(['/instructor/dashboard']); // Navigate to instructor details or another appropriate page
      },
      error => console.error('Error creating course:', error)
    );
  }

  addSchedule(): void {
    this.newCourse.schedule.push({
      courseID: +this.newCourse.courseID,
      instructorID: +this.newCourse.instructorID,
      date: new Date(),
      startTime: '',
      endTime: '',
      location: ''
    });
  }

  removeSchedule(index: number): void {
    this.newCourse.schedule.splice(index, 1);
  }

  
  goBack(): void {
    this.location.back();
  }
}

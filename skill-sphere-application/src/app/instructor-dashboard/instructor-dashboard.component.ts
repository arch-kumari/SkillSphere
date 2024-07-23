import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorDashboardService } from '../service/instructor-dashboard.service';
import IInstructorOrOrganizerModel from '../interfaces/IInstructorOrOrganizerModel';
import ICourseModel from '../interfaces/ICourseModel';
import { LoggingService } from '../service/logging.service';
import { firstValueFrom } from 'rxjs'; // Import firstValueFrom from RxJS

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css'], // Corrected from styleUrl to styleUrls
  providers: [InstructorDashboardService,LoggingService]
})
export class InstructorDashboardComponent implements OnInit {

  instructorsDetails: any;
  instArray: IInstructorOrOrganizerModel[] = [];
  courses: ICourseModel[] = [];
  userID: string = '';
  instructorID: string = '';

  constructor(private instructorDashboardService: InstructorDashboardService, private router: Router,
     private loggingService: LoggingService) { }

     ngOnInit(): void {
      this.initializeDashboard();
    }
  
    private async initializeDashboard() {
      try {
        const instructorInfo = await firstValueFrom(this.instructorDashboardService.getInstructor());
        console.log("Instructor info:", instructorInfo);
        this.loggingService.log("Instructor info: " + JSON.stringify(instructorInfo));
        this.instructorsDetails = instructorInfo;
  
        if (this.instructorsDetails && this.instructorsDetails.userID && this.instructorsDetails.instructorID) {
          this.userID = this.instructorsDetails.userID;
          this.instructorID = this.instructorsDetails.instructorID;
          this.loggingService.log("User ID:" + this.userID);
          this.loggingService.log("Instructor ID:" + this.instructorID);
        } else {
          this.loggingService.log("User ID or Instructor ID is missing in the instructor details:" + this.instructorsDetails);
        }
  
        const courseInfo = await firstValueFrom(this.instructorDashboardService.getCourses());
        this.loggingService.log("Course info:" + courseInfo);
        this.courses = courseInfo;
  
        await firstValueFrom(this.instructorDashboardService.updateInstructor(this.instructorID, this.instructorsDetails));
        this.loggingService.log('InstructorsDetails updated successfully');
  
      } catch (error) {
        this.loggingService.log("Error: " + error);
        console.error("Error:", error);
      }
    }
  

  // ngOnInit(): void {
  //   this.instructorDashboardService.getInstructor().subscribe(instructorInfo => {
  //     console.log("Instructor info:", instructorInfo);
  //     this.loggingService.log("Instructor info: " + JSON.stringify(instructorInfo));
  //     this.instructorsDetails = instructorInfo;
  
  //     if (this.instructorsDetails && this.instructorsDetails.userID && this.instructorsDetails.instructorID) {
  //       this.userID = this.instructorsDetails.userID;
  //       this.instructorID = this.instructorsDetails.instructorID;
  //       this.loggingService.log("User ID:"+ this.userID);
  //       this.loggingService.log("Instructor ID:"+ this.instructorID);
  //     } else {
  //       this.loggingService.log("User ID or Instructor ID is missing in the instructor details:"+ this.instructorsDetails);
  //     }
  //   }, error => {
  //     this.loggingService.log("Error fetching instructor info:"+ error);
  //   });

  //   this.instructorDashboardService.getCourses().subscribe(courseInfo => {
  //     this.loggingService.log("Course info:"+ courseInfo);
  //     this.courses = courseInfo;
  //   }, error => {
  //     console.error("Error fetching course info:", error);
  //   });

  //   this.instructorDashboardService.updateInstructor(this.instructorID, this.instructorsDetails).subscribe(
  //     () => {
  //       this.loggingService.log('InstructorsDetails updated successfully');
  //   },       
  //   error => console.error('Error updating instructorsDetails:', error)
  //   );
  // }

  createCourse(): void {
    if (this.userID && this.instructorID) {
      const data = { userID: this.userID, instructorID: this.instructorID };
      this.loggingService.log("User info:"+ JSON.stringify(data));
      this.router.navigate(['/create-course'], { state: data });
    } else {
      this.loggingService.log("User ID or Instructor ID is missing.");
    }
  }

  editCourse(courseName: string): void {
    const data = { courseName: courseName};
    this.router.navigate(['/update-course', courseName],{ state: data }); 
  }

  deleteCourse(courseID: string): void {
    if (window.confirm('Are you sure you want to delete this course?')) {
      this.instructorDashboardService.deleteCourse(courseID).subscribe(() => {
        this.courses = this.courses.filter(course => course.courseID !== courseID);
        this.router.navigate(['/instructor/dashboard']); // Navigate to instructor details or another appropriate page
      }, error => {
        console.error('Error deleting course:', error);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../service/class.service';
import ICourseModel from '../interfaces/ICourseModel';
import { CoachesService } from '../service/coaches.service';
import IInstructorOrOrganizerModel from '../interfaces/IInstructorOrOrganizerModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  providers: [ClassService, CoachesService]
})
export class ClassComponent implements OnInit {
  course: Observable<ICourseModel> | undefined;
  courseName: string;
  coursesWithInstructors: any[] = [];// Assuming this will hold the instructor data
  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private coachesService: CoachesService
  ) { 
    this.courseName = route.snapshot.paramMap.get('courseName')!;
    if (this.courseName) {
      this.course = this.classService.getCourse(this.courseName);
      this.course.subscribe(course => {
        this.coachesService.getInstructorNameUsingId(course.instructorID).subscribe(
          instructors => {
            this.coursesWithInstructors.push({ course, instructors }); // Check if this logs the instructor data
           }
        );
      });
    }
  }

  ngOnInit(): void {}
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClassesService } from '../service/classes.service';
import { CoachesService } from '../service/coaches.service';
import ICourseModel from '../interfaces/ICourseModel';
import { Observable } from 'rxjs';
import IInstructorOrOrganizerModel from '../interfaces/IInstructorOrOrganizerModel';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.scss'],
  providers: [ClassesService, CoachesService]
})
export class WelcomepageComponent {
  instructorsDetails: IInstructorOrOrganizerModel[] = [];
  coursesWithInstructors: any[] = [];
  @ViewChild('cardGroup') cardGroup!: ElementRef;
  @ViewChild('instructorCardGroup') instructorCardGroup!: ElementRef;

  constructor(private classesService: ClassesService, private coachesService: CoachesService) { }

  ngOnInit(): void {
    this.coachesService.getInstructors().subscribe(instructors => {
      this.instructorsDetails = instructors;
    });
    this.classesService.getCourses().subscribe(courses => {
      courses.forEach(course => {
        this.coachesService.getInstructorNameUsingId(course.instructorID).subscribe(instructor => {
          this.coursesWithInstructors.push({ course, instructor });
        });
      });
    });


  }

  scrollTeamMembers(direction: number) {
    const cardGroupElement: HTMLElement = this.cardGroup.nativeElement;
    const scrollAmount = 300; // Adjust as needed for scrolling distance

    if (cardGroupElement) {
      if (direction === -1) {
        cardGroupElement.scrollLeft -= scrollAmount; // Scroll left
      } else if (direction === 1) {
        cardGroupElement.scrollLeft += scrollAmount; // Scroll right
      }
    }
  }

  scrollInstructorCards(direction: number) {
    const instructorCardGroupElement: HTMLElement = this.instructorCardGroup.nativeElement;
    const scrollAmount = 300; // Adjust as needed for scrolling distance

    if (instructorCardGroupElement) {
      if (direction === -1) {
        instructorCardGroupElement.scrollLeft -= scrollAmount; // Scroll left
      } else if (direction === 1) {
        instructorCardGroupElement.scrollLeft += scrollAmount; // Scroll right
      }
    }
  }

  scrollLeft(): void {
    const container = this.cardGroup.nativeElement as HTMLElement;
    container.scrollLeft -= 300; // Adjust scroll step as needed
  }

  scrollRight(): void {
    const container = this.cardGroup.nativeElement as HTMLElement;
    container.scrollLeft += 300; // Adjust scroll step as needed
  }
}

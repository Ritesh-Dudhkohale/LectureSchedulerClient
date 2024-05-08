import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-assign-lecture',
  standalone: true,
  providers: [DatePipe, UpperCasePipe],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './assign-lecture.component.html',
  styleUrl: './assign-lecture.component.css',
})
export class AssignLectureComponent {
  course!: any;
  courseID!: any;
  availableInstructors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private admin: AdminService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.courseID = this.route.snapshot.paramMap.get('courseID') as string;
    this.getCourse(this.courseID);
  }

  assignLectureForm = this.fb.group({
    instructorID: ['', Validators.required],
    date: ['', Validators.required],
  });

  getCourse(courseID: string) {
    this.admin.getCourse(courseID).subscribe({
      next: (res: any) => {
        this.course = res.data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onDateChange(event: Event): void {
    const dateInput = event.target as HTMLInputElement;
    const dateString = this.datePipe.transform(dateInput.value, 'yyyy-MM-dd');

    if (dateString) {
      this.admin.getAvailableInstructors(dateString).subscribe({
        next: (res: any) => {
          console.log(res);
          this.availableInstructors = res.data;
          // this.assignLectureForm.get('instructorID').setValue(instructorId);
          console.log(this.availableInstructors);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  assignLecture() {
    const { instructorID, date } = this.assignLectureForm.value;
    this.admin
      .assignLecture({ courseID: this.courseID, instructorID, date })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/admin');
        },
        error: (err) => {
          console.log(err);
          alert(`Assignig lecture Failed :- ${err.error.message}`);
          this.router.navigateByUrl('/admin');
        },
      });
  }
}

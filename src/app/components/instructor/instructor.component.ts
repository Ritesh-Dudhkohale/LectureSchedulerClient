import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { InstructorService } from '../../services/instructor/instructor.service';
import { DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-instrctor',
  standalone: true,
  imports: [JsonPipe, DatePipe, UpperCasePipe],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css',
})
export class InstructorComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private instructor: InstructorService
  ) {}

  currentUser: any;
  schedules: any;
  counter = 1;
  ngOnInit() {
    this.getProfile();
    this.getMySchedule();
  }

  getMySchedule() {
    this.instructor.getMyScheduleService().subscribe({
      next: (res: any) => {
        this.schedules = res.data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getProfile() {
    this.currentUser = JSON.parse(
      localStorage.getItem('Current User') as string
    );
    console.log(this.currentUser);
  }

  logoutUser() {
    this.auth.logoutUser();
    this.router.navigateByUrl('/login');
  }
}

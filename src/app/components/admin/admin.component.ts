import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { CoursecardComponent } from '../coursecard/coursecard.component';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    UpperCasePipe,
    CoursecardComponent,
    CommonModule,
    RouterLink,
    ScheduleComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private admin: AdminService
  ) {}

  currentUser: any;

  ngOnInit() {
    this.getProfile();
    this.getCourse();
    this.getAllSchedule();
  }

  getProfile() {
    this.currentUser = JSON.parse(
      localStorage.getItem('Current User') as string
    );
  }

  allCourses: any;

  getCourse() {
    this.admin.getAllCourses().subscribe({
      next: (res: any) => {
        this.allCourses = res.data;
      },
      error: (err: any) => {
        console.error('Error creating course:', err);
      },
    });
  }

  schedules: any;
  getAllSchedule() {
    this.admin.getAllSchedule().subscribe({
      next: (res: any) => {
        this.schedules = res.data;
        console.log(res.data);
        
      },
      error: (err: any) => {
        console.error('Error creating course:', err);
      },
    });
  }

  logoutUser() {
    this.auth.logoutUser();
    this.router.navigateByUrl('/login');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private base_url = 'https://lectureschedulerserver.onrender.com/api/admins';

  getAvailableInstructors(date: string) {
    return this.http.get(`${this.base_url}/instructors/${date}`);
  }

  createCourse(courseData: any) {
    return this.http.post(`${this.base_url}/courses`, courseData);
  }

  getAllCourses() {
    return this.http.get(`${this.base_url}/courses`);
  }

  getCourse(courseId: any) {
    return this.http.get(`${this.base_url}/courses/${courseId}`);
  }

  assignLecture(data: any) {
    return this.http.post(`${this.base_url}/lectures`, data);
  }

  getAllSchedule() {
    return this.http.get(`${this.base_url}/lectures`);
  }
}

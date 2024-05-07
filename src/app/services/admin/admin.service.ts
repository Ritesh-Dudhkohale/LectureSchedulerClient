import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private base_url = 'http://localhost:8080/api/admins';

  getAllIngetstructors() {
    return this.http.get(`${this.base_url}/instructors`);
  }

  assignLecture() {
    return this.http.get(`${this.base_url}/instructors`);
  }

  createCourse(courseData: any) {
    return this.http.post(`${this.base_url}/courses`, courseData);
  }

  
  getAllSchedule() {
    return this.http.get(`${this.base_url}/lectures`);
  }


  getAllCourses() {
    return this.http.get(`${this.base_url}/courses`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  constructor(private http: HttpClient) {}

  private base_url = 'https://lectureschedulerserver.onrender.com/api/instructors/schedule';

  getMyScheduleService() {
    return this.http.get(this.base_url);
  }
}

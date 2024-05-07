import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  constructor(private http: HttpClient) {}

  private base_url = 'http://localhost:8080/api/instructors/schedule';

  getMyScheduleService() {
    return this.http.get(this.base_url);
  }
}

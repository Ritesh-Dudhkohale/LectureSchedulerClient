import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coursecard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './coursecard.component.html',
  styleUrl: './coursecard.component.css',
})
export class CoursecardComponent {
  @Input('course') course: any;

  assignLecture(course: string) {}
}

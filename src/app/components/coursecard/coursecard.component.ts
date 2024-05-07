import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coursecard',
  standalone: true,
  imports: [],
  templateUrl: './coursecard.component.html',
  styleUrl: './coursecard.component.css',
})
export class CoursecardComponent {
  @Input('course') course: any;
  assignLecture(){}
}

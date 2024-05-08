import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-addcourse',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './addcourse.component.html',
  styleUrl: './addcourse.component.css',
})
export class AddcourseComponent {
  courseForm: FormGroup;
  image: any;

  constructor(
    private fb: FormBuilder,
    private courseService: AdminService,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      level: ['intermediate', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.courseForm.invalid) {
      return;
    }
    const { name, level, description, image } = this.courseForm.value;
    
    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('level', level);
    formData.append('description', description);
    formData.append('image', this.image);

    this.courseService.createCourse(formData).subscribe({
      next: (res: any) => {
        console.log('Course created successfully:', res);
        this.router.navigateByUrl('/admin');
      },
      error: (error: any) => {
        console.error('Error creating course:', error);
      },
    });
  }

  onStateChange(event: any) {
    this.image = event.target.files[0];
  }
}

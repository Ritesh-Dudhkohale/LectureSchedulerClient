import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  registerData: FormGroup = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    role: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  registerUser() {
    this.auth.registerUser(this.registerData).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

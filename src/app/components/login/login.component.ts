import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  loginData: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  loginUser() {
    const { email, password } = this.loginData.value;

    this.auth.loginUser({ email, password }).subscribe({
      next: (res) => {
        console.log(res);

        const user = JSON.parse(localStorage.getItem('Current User') as string);

        const userRole = user.role;
        console.log(user.role);

        if (userRole === 'instructor') {
          this.router.navigateByUrl('/instructor');
        } else {
          this.router.navigateByUrl('/admin');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddcourseComponent } from './components/addcourse/addcourse.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'instructor', component: InstructorComponent },
  { path: 'addcourse', component: AddcourseComponent },

  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

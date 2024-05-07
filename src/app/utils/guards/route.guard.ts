import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const routeGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let router = inject(Router);
  const currentUser = JSON.parse(localStorage.getItem('Current User') as string);

  if (auth.getIsAuthenticated()) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};

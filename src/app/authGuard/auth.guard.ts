import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // const userService = inject(UserService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (token) {
    console.log("Calling true")
    return true;
  } else {
    router.navigate(['/']);
    console.log("calling false")
    return false;
  }
};

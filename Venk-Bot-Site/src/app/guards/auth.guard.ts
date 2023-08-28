import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return new Observable<boolean>(obs => {
    userService.getUser().subscribe({
      next: result => {
        if (result != null) obs.next(true);
        else {
          router.navigate(['/']);
          obs.next(false);
        }
      },
      error: err => {
        console.log(err);
        router.navigate(['/']);
        obs.next(false);
      }
    });
  });
};

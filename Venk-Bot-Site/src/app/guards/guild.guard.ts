import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

export const guildGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return new Observable<boolean>(obs => {
    userService.getUser().subscribe({
      next: result => {
        if (result != null) {
          let guild = (result.guilds == undefined ? [] : (result.guilds as unknown) as any[]).find(g => g.id == state.url.substring(state.url.lastIndexOf('/') + 1));
          if (!guild) {
            router.navigate(['/dashboard']);
            obs.next(false);
          } else {
            if ((guild.permissions & 0x20) == 0x20) obs.next(true);
            else {
              router.navigate(['/dashboard']);
              obs.next(false);
            }
          }
        } else {
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

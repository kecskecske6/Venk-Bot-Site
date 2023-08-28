import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserModel } from './classes/user-model';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Venk-Bot-Site';

  user: UserModel | null = null;

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) {
    if (!this.cookieService.check('connect.sid')) this.logout();
    if (!this.user) this.getUser();
  }

  login(): void {
    location.href = `${environment.backend}/auth/discord`;
  }

  getUser(): void {
    this.userService.getUser().subscribe({
      next: result => this.user = result,
      error: err => console.log(err)
    });
  }

  logout(): void {
    this.userService.logOut().subscribe({
      next: () => this.user = null,
      error: err => console.log(err)
    });
    this.cookieService.delete('connect.sid');
    this.router.navigate(['/']);
  }

}

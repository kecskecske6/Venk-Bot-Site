import { Component } from '@angular/core';
import { UserModel } from './classes/user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Venk-Site';

  user: UserModel | null = null;

  constructor() {
    if (!this.user) this.getUser();
  }

  logout(): void {
    this.user = null;
    window.sessionStorage.removeItem('user');
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  }

  getUser(): void {
    if (window.sessionStorage.getItem('user')) {
      this.user = new UserModel();
      const userFromSession = JSON.parse(window.sessionStorage.getItem('user') as string);
      this.user.username = userFromSession.username;
      this.user.avatar = userFromSession.avatar;
    }
  }

}

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
  title = 'Venk-Site';

  user: UserModel | null = null;

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) {
  }

}

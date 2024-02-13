import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/classes/DTOs/login-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginDto: LoginDTO = new LoginDTO();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (window.sessionStorage.getItem('user'))
      this.router.navigate(['/']);
  }

  login(): void {
    this.userService.login(this.loginDto).subscribe({
      next: result => {
        if (result.success) {
          window.sessionStorage.setItem('user', JSON.stringify(result));
          window.location.reload();
        } else (document.getElementById('validation') as HTMLElement).style.display = 'initial';
      }
    })
  }

}

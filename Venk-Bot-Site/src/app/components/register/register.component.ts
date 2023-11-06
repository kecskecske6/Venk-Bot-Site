import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/classes/DTOs/register-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerDto: RegisterDTO = new RegisterDTO();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  register(): void {
    this.userService.register(this.registerDto).subscribe({
      next: result => {
        if (result.success) {
          this.removeValidation();
          this.router.navigate(['/login']);
        }
        else {
          this.removeValidation();
          result.messages.forEach(m => {
            (document.getElementById(m.field + '-validation') as HTMLElement).innerText += m.message + '\n';
          });
        }
      }
    })
  }

  removeValidation(): void {
    (document.getElementById('email-validation') as HTMLElement).innerText = '';
    (document.getElementById('username-validation') as HTMLElement).innerText = '';
    (document.getElementById('password-validation') as HTMLElement).innerText = '';
    (document.getElementById('password-again-validation') as HTMLElement).innerText = '';
  }

}

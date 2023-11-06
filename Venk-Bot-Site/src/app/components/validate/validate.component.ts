import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.sass']
})
export class ValidateComponent implements OnInit {

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
    this.userService.validate(this.router.url.split('/')[this.router.url.split('/').length - 1]).subscribe({
      next: result => {
        if (result)
          (document.getElementById('success') as HTMLElement).style.display = 'initial';
        else
          (document.getElementById('error') as HTMLElement).style.display = 'initial';
      }
    });
  }

}

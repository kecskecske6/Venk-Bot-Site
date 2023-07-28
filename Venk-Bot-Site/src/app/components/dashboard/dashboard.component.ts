import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  guilds: any[] | undefined = undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getGuilds();
  }

  getGuilds(): void {
    this.userService.getUser().subscribe({
      next: result => this.guilds = result.guilds,
      error: err => console.log(err)
    });
  }

}

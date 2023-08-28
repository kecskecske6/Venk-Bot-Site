import { Component, OnInit } from '@angular/core';
import { DiscordService } from 'src/app/services/discord.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  guilds: any[] | undefined = undefined;

  botGuilds: any[] = [];

  botGuildIds: string[] = [];

  constructor(private userService: UserService, private discordService: DiscordService) {}

  ngOnInit(): void {
    this.getGuilds();
    this.getBotGuilds();
  }

  getGuilds(): void {
    this.userService.getUser().subscribe({
      next: result => this.guilds = result.guilds,
      error: err => console.log(err)
    });
  }

  getBotGuilds(): void {
    this.discordService.getBotGuilds().subscribe({
      next: result => this.botGuilds = result,
      error: err => console.log(err),
      complete: () => this.botGuildIds = this.botGuilds.map(g => g.id)
    });
  }

}

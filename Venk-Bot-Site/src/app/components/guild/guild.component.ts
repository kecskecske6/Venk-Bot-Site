import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerModel } from 'src/app/classes/server-model';
import { DiscordService } from 'src/app/services/discord.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.sass']
})
export class GuildComponent implements OnInit {

  server: ServerModel = new ServerModel();

  channels: any[] = [];

  constructor(private serverService: ServerService, private router: Router, private discordService: DiscordService) { }

  ngOnInit(): void {
    this.getServerInfo();
    this.getGuildChannels();
  }

  getServerInfo(): void {
    this.serverService.getServer(this.router.url.substring(this.router.url.lastIndexOf('/') + 1)).subscribe({
      next: result => this.server = result,
      error: err => console.log(err)
    });
  }

  getGuildChannels(): void {
    this.discordService.getGuildChannels(this.router.url.substring(this.router.url.lastIndexOf('/') + 1)).subscribe({
      next: result => this.channels = result,
      error: err => console.log(err)
    });
  }

  saveServer(): void {
    this.serverService.saveServer(this.router.url.substring(this.router.url.lastIndexOf('/') + 1), this.server).subscribe({
      next: result => alert(result ? 'Success' : 'Error'),
      error: err => console.log(err)
    });
  }

}

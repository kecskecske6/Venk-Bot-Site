import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/app/classes/file-model';
import { GameModel } from 'src/app/classes/game-model';
import { ModModel } from 'src/app/classes/mod-model';
import { GameService } from 'src/app/services/game.service';
import { ModService } from 'src/app/services/mod.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload-mod',
  templateUrl: './upload-mod.component.html',
  styleUrls: ['./upload-mod.component.sass']
})
export class UploadModComponent implements OnInit {

  files: FileModel[] = [];

  games: GameModel[] = [];

  mod: ModModel = new ModModel();

  constructor(private modService: ModService, private gameService: GameService) { }

  ngOnInit(): void {
    this.getGames();
    this.getUser();
  }

  getGames(): void {
    this.gameService.getAll().subscribe({
      next: result => this.games = result,
      error: err => console.log(err)
    });
  }

  getUser(): void {
    if (window.sessionStorage.getItem('user')) {
      const userFromSession = JSON.parse(window.sessionStorage.getItem('user') as string);
      this.mod.authorId = userFromSession.id;
    }
  }

  uploadFile(input: HTMLInputElement): void {
    if (!input.files) return;

    const files: FileList = input.files;
    const file = files.item(0);
    if (file) {
      this.mod.uploadDate = new Date();
      this.modService.uploadFile(this.mod, file).subscribe({
        next: result => console.log(result),
        error: err => console.log(err)
      });
    }
  }

  writeFileInfo(input: HTMLInputElement): void {
    this.files = [];
    if (input.files) {
      const fileList: FileList = input.files;
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);
        if (file) {
          const model: FileModel = new FileModel();
          model.name = file.name;
          model.size = file.size < 1024 ? `${file.size}B` : (file.size < 1024 * 1024 ? `${Math.round(file.size / 1024 * 100) / 100}kB` : `${Math.round(file.size / (1024 * 1024) * 100) / 100}MB`);
          this.files.push(model);
        }
      }
    }


  }

}

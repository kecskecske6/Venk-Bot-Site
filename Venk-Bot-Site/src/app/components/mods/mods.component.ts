import { Component, OnInit } from '@angular/core';
import { ModModel } from 'src/app/classes/mod-model';
import { ModService } from 'src/app/services/mod.service';

@Component({
  selector: 'app-mods',
  templateUrl: './mods.component.html',
  styleUrls: ['./mods.component.sass']
})
export class ModsComponent implements OnInit {

  mods: ModModel[] = [];

  constructor(private modService: ModService) { }

  ngOnInit(): void {
    this.getMods();
  }

  getMods(): void {
    this.modService.getAll().subscribe({
      next: result => this.mods = result,
      error: err => console.log(err)
    });
  }

}

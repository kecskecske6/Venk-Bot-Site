import { Component, OnInit, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { FileModel } from 'src/app/classes/file-model';

@Component({
  selector: 'app-upload-mod',
  templateUrl: './upload-mod.component.html',
  styleUrls: ['./upload-mod.component.sass']
})
export class UploadModComponent implements OnInit {

  private storage: Storage = inject(Storage);

  files: FileModel[] = [];

  ngOnInit(): void {

  }

  uploadFile(input: HTMLInputElement): void {
    if (!input.files) return;

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, file.name);
        uploadBytesResumable(storageRef, file);
      }
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

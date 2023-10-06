import { Component, OnInit, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-upload-mod',
  templateUrl: './upload-mod.component.html',
  styleUrls: ['./upload-mod.component.sass']
})
export class UploadModComponent implements OnInit {

  private storage: Storage = inject(Storage);

  ngOnInit(): void {

  }

  uploadFile(input: HTMLInputElement): void {
    if (!input.files) return

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
            const storageRef = ref(this.storage, file.name);
            uploadBytesResumable(storageRef, file);
        }
    }
  }

}

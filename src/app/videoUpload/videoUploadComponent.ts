import {Component} from '@angular/core';
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {UploadVideoService} from "./upload-video.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-upload',
  templateUrl: './videoUploadComponent.html',
  styleUrls: ['./videoUploadComponent.css']
})
export class VideoUploadComponent {

  public files: NgxFileDropEntry[] = [];
  isUploaded: boolean = false;
  fileEntry: FileSystemFileEntry | undefined;

  constructor(private videoService: UploadVideoService, private router: Router) {
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.isUploaded = true;
      }
    }
  }


  uploadVideo() {
    if (this.fileEntry !== undefined) {
      this.videoService.uploadVideo(this.fileEntry).subscribe(data => {
        console.log(data.videoId)
        this.router.navigateByUrl("/save-video-details/" + data.videoId);
      })
    }
  }
}

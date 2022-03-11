import {Component, OnDestroy} from '@angular/core';
import {UploadVideoService} from "../videoUpload/upload-video.service";
import {VideoDto} from "../VideoDto";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnDestroy {

  videos: Array<VideoDto> = [];
  getAllVideosSubscription: Subscription;

  constructor(private videoService: UploadVideoService) {
    this.getAllVideosSubscription = videoService.getAllVideos().subscribe(data => {
      this.videos = data;
    });
  }

  ngOnDestroy(): void {
    this.getAllVideosSubscription.unsubscribe();
  }
}

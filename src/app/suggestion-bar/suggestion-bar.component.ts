import { Component, OnInit } from '@angular/core';
import {VideoDto} from "../VideoDto";
import {Subscription} from "rxjs";
import {UploadVideoService} from "../videoUpload/upload-video.service";

@Component({
  selector: 'app-suggestion-bar',
  templateUrl: './suggestion-bar.component.html',
  styleUrls: ['./suggestion-bar.component.css']
})
export class SuggestionBarComponent{

  suggestedVideos: Array<VideoDto> = [];
  getSuggestedVideosSubscription: Subscription;

  constructor(private videoService: UploadVideoService) {
    this.getSuggestedVideosSubscription = videoService.getSuggestedVideos("").subscribe(data => {
      this.suggestedVideos = data;
    });
  }
}

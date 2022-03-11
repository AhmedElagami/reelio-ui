import {Injectable} from '@angular/core';
import {FileSystemFileEntry} from "ngx-file-drop";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UploadVideoResponse} from "./UploadVideoResponse";
import {Observable} from "rxjs";
import {VideoDto} from "../VideoDto";
import {AuthenticationService} from "../auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UploadVideoService {

  uploadVideoResponse: UploadVideoResponse | undefined;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
  }

  public uploadVideo(file: FileSystemFileEntry): Observable<UploadVideoResponse> {
    return file.file((file => {
      const id = this.authService.getUserId();
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("user-id", id !== null ? id : '');
      return this.httpClient.post<UploadVideoResponse>('http://localhost:8080/api/video/upload', formData,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
        });
    }))
  }

  public getVideoResponse(): UploadVideoResponse {
    return <UploadVideoResponse>this.uploadVideoResponse;
  }

  public getVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.get<VideoDto>("http://localhost:8080/api/video/" + videoId);
  }

  uploadThumbnail(selectedFile: File, videoId: string): Observable<string> {
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    fd.append('videoId', videoId);
    return this.httpClient.post('http://localhost:8080/api/video/thumbnail/upload', fd,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
        responseType: 'text'
      });
  }

  saveVideo(videoMetData: VideoDto): Observable<VideoDto> {
    return this.httpClient.put<VideoDto>("http://localhost:8080/api/video/", videoMetData,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      })
  }

  getAllVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/video/", {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  likeVideo(videoId: string | ""): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("http://localhost:8080/api/video/" + videoId + "/like", null,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    })
  }

  dislikeVideo(videoId: string | "") {
    return this.httpClient.post<VideoDto>("http://localhost:8080/api/video/" + videoId + "/dislike",null, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    })
  }

  getSuggestedVideos(userId: string | ""): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/video/suggested/"+userId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}

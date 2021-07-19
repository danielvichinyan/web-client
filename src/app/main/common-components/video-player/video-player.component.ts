import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  public playlist = [
    {
      title: 'Pale Blue Dot',
      description: 'Description',
      src: 'http://static.videogular.com/assets/videos/videogular.mp4',
      type: 'video/mp4'
    },
    {
      title: 'Big Buck Bunny',
      description: 'Description',
      src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
      type: 'video/mp4'
    },
    {
      title: 'Elephants Dream',
      description: 'Description',
      src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
      type: 'video/mp4'
    }
  ];

  public currentIndex: number = 0;
  public currentVideo = this.playlist[this.currentIndex];
  public api;

  constructor() { }

  ngOnInit(): void {
  }

  public nextVideo(): void {
    this.currentIndex++;

    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }

    this.currentVideo = this.playlist[this.currentIndex];
  }

  public onClickPlaylistVideo(video, index: number): void {
    this.currentIndex = index;
    this.currentVideo = video;
  }

  public onPlayerReady(api): void {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  public playVideo(): void {
    this.api.play();
  }
}
